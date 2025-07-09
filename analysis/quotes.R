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

quotes <- data |> 
  filter(str_ends(clue,'"')) |> 
  filter(str_starts(clue,'"')) |> 
  filter(!str_detect(clue,'":')) |> 
  filter(!str_detect(clue, "_"))

quotes_clue_frequency <- quotes |> 
  group_by(clue) |> 
  tally()

quotes_answer_frequency <- quotes |> 
  group_by(answer) |> 
  tally()

quotes_answer_frequency |> 
  arrange(-n) |> 
  head(10) |> 
  ggplot(aes(x=reorder(answer, -n), y=n))+
  theme_bw()+
  ylim(0,250)+
  geom_bar(stat="identity")

brackets <- data |> 
  filter(str_starts(clue, "\\[")) |> 
  filter(str_ends(clue, "\\]"))

brackets_clue_frequency <- brackets |> 
  group_by(clue) |> 
  tally()

brackets_answer_frequency <- brackets |> 
  group_by(answer) |> 
  tally()

brackets_answer_frequency |> 
  arrange(-n) |> 
  head(10) |> 
  ggplot(aes(x=reorder(answer, -n), y=n))+
  theme_bw()+
  ylim(0,40)+
  geom_bar(stat="identity")
