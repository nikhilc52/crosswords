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
  filter(!str_detect(clue,'":'))

clue_frequency <- quotes |> 
  group_by(clue) |> 
  tally()

answer_frequency <- quotes |> 
  group_by(answer) |> 
  tally()

answer_frequency |> 
  arrange(-n) |> 
  head(10) |> 
  ggplot(aes(x=reorder(answer, -n), y=n))+
  theme_bw()+
  ylim(0,250)+
  geom_bar(stat="identity")

onomatopoeia <- data |> 
  filter(str_starts(clue, "\\[")) |> 
  filter(str_ends(clue, "\\]"))

onomatopoeia_clue_frequency <- onomatopoeia |> 
  group_by(clue) |> 
  tally()

onomatopoeia_answer_frequency <- onomatopoeia |> 
  group_by(answer) |> 
  tally()

onomatopoeia_answer_frequency |> 
  arrange(-n) |> 
  head(10) |> 
  ggplot(aes(x=reorder(answer, -n), y=n))+
  theme_bw()+
  ylim(0,40)+
  geom_bar(stat="identity")
