library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(tidytext)

setwd("~/GitHub/crosswords/analysis")

data <- read_csv('../crossword_clues.csv')

data <- data |> 
  mutate(date = as.Date(date, format = "%m-%d-%Y")) |> 
  mutate(year = format(date, "%Y"))
  
frequencies <- data |> 
  group_by(clue) |> 
  summarize(
    count = n(),
    ex_answer = first(answer)
  ) |> 
  arrange(-count)

ttr <- data |> 
  group_by(day) |> 
  summarise( ttr = n_distinct(answer)/ n())

length_per_day <- data |> 
  mutate(length = str_length(clue)) |> 
  filter(!is.na(length)) |> 
  group_by(day) |> 
  summarize(
    avg_len = mean(length)
  )

clue_words <- unnest_tokens(data, clue_word, clue) |> 
  group_by(clue_word) |> 
  summarize(
    count = n(),
    most_common_answer = collapse::fmode(answer)
  ) |> 
  filter(!clue_word %in% stopwords::stopwords(language="en")) |> 
  arrange(-count)


