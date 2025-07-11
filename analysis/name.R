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

adele <- data |> 
  filter(answer == 'ADELE')|> 
  group_by(year) |> 
  tally()

adele |> 
  mutate(year = as.numeric(year)) |> 
  ggplot(aes(x=year, y=n))+
  geom_bar(stat="identity")

working <- data |> 
  filter(answer == 'ADELE')

write_csv(working, 'adele.csv')

serena <- data |> 
  filter(answer == 'SERENA')|> 
  group_by(year) |> 
  tally()

serena |> 
  mutate(year = as.numeric(year)) |> 
  ggplot(aes(x=year, y=n))+
  geom_bar(stat="identity")

working <- data |> 
  filter(answer == 'SERENA')


