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

clue_words <- unnest_tokens(data, clue_word, clue) |> 
  group_by(clue_word) |> 
  summarize(
    count = n(),
    most_common_answer = collapse::fmode(answer)
  ) |> 
  filter(!clue_word %in% stopwords::stopwords(language="en")) |> 
  arrange(-count)


