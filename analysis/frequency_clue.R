library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(tidytext)
library(gganimate)

setwd("~/GitHub/crosswords/analysis")

data <- read_csv('../crossword_clues.csv')

data <- data |> 
  mutate(date = as.Date(date, format = "%m-%d-%Y")) |> 
  mutate(year = format(date, "%Y"))
  
working <- data |> 
  filter(answer == 'SRI')

clue_frequencies <- data |> 
  group_by(clue) |> 
  filter(n() > 1) |> 
  summarize(
    count = n(),
    ex_answer = first(answer),
    unique_answers = n_distinct(answer)
  )

clue_answer_frequencies <- data |> 
  group_by(clue, answer) |>  
  filter(n() > 1) |> 
  summarize(
    count = n()
  )

clue_length <- data |> 
  mutate(length = str_length(clue)) |> 
  filter(!is.na(length)) |> 
  group_by(day, year) |> 
  summarize(
    count=n(),
    avg_len = mean(length)
  ) |> 
  mutate(year = as.numeric(year))

colors <- data.frame(
  day = c('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
  hex = c('#A8D9FF','#AFC8DB','#9CABB6','#687F92','#3E596D','#1F3749','#0E2333')
)

clue_length <- left_join(clue_length, colors, by=join_by('day'=='day'))

working <- clue_length |> 
  filter(year == 2024)

animation <- clue_length |> 
  filter(year != 1993) |> 
  filter(year != 2025) |> 
  ggplot()+
  geom_line(aes(x=year, y=avg_len, group = day, color=hex), size=5)+
  scale_color_identity()+
  theme(panel.background = element_rect(fill="white", color="white"))+
  transition_reveal(year)

animation <- animate(animation, fps=30, duration=2, height=15, width=15, res=100, units="in")

anim_save('images/clue_length.gif',animation)

clue_words <- unnest_tokens(data, clue_word, clue) |> 
  group_by(clue_word) |> 
  summarize(
    count = n(),
    most_common_answer = collapse::fmode(answer)
  ) |> 
  filter(!clue_word %in% stopwords::stopwords(language="en")) |> 
  arrange(-count)


