library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(tidytext)
library(gganimate)

setwd("~/GitHub/crosswords/analysis")

data <- read_csv('../crossword_clues.csv')

working <- data |> 
  filter(answer == "SSN")

data <- data |> 
  mutate(date = as.Date(date, format = "%m-%d-%Y")) |> 
  mutate(year = format(date, "%Y"))

ttr <- data |> 
  group_by(day, year) |>
  summarise( ttr = n_distinct(answer)/ n(), count=n()) |> 
  mutate(year = as.numeric(year))

colors <- data.frame(
  day = c('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
  hex = c('#A8D9FF','#AFC8DB','#9CABB6','#687F92','#3E596D','#1F3749','#0E2333')
)

ttr <- left_join(ttr, colors, by=join_by('day'=='day'))

animation <- ttr |> 
  filter(year != 1993) |> 
  filter(year != 2025) |> 
  ggplot()+
  geom_line(aes(x=year, y=ttr, group = day, color=hex), size=5)+
  scale_color_identity()+
  theme(panel.background = element_rect(fill="white", color="white"))+
  transition_reveal(year)

animation <- animate(animation, fps=30, duration=2, height=15, width=15, res=100, units="in")

anim_save('images/ttr_year.gif',animation)

length_per_day <- data |> 
  mutate(length = str_length(answer)) |> 
  filter(!is.na(length)) |> 
  group_by(day) |> 
  summarize(
    count=n(),
    avg_len = mean(length)
  )

unique_words <- data |>
  group_by(day) |> 
  mutate(count_clues = n()) |> 
  group_by(answer) |> 
  summarize(
    count = n(),
    year = first(year),
    day = first(day),
    count_clues = first(count_clues)
  ) |> 
  filter(count == 1) |> 
  group_by(day) |> 
  summarize(
    count_unique_clues = n(),
    count_clues = first(count_clues),
    percent_unique = count_unique_clues/count_clues
  )

