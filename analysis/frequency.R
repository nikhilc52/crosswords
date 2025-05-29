library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)

data <- read_csv('../crossword_clues.csv')

data <- data |> 
  filter(!is.na(answer))

frequencies <- data |> 
  group_by(answer) |> 
  summarize(
    count = n(),
    length = first(str_length(answer))
  ) |> 
  mutate(freq_rank = rank(-count,ties.method="min")) |> 
  arrange(-count)

frequencies |> 
  ggplot()+
  geom_point(aes(x=freq_rank, y=count))+
  scale_x_continuous(transform = "log10",labels = scales::label_comma(),n.breaks=10)+
  scale_y_continuous(transform = "log10",labels = scales::label_comma(),n.breaks=10)


index <- 1
values <- vector("list", nrow(data))
for (i in data$answer) {
  cv_word <- ""
  for (j in 1:str_length(i)){
    if (substr(i, j, j) %in% c('A','E','I','O','U')){
      cv_word <- paste0(cv_word, 'V')
    }
    else{
      cv_word <- paste0(cv_word, 'C')
    }
  }
  values[index] <- cv_word
  print(index)
  index <- index + 1
}

data$cv <- values

cv_frequencies <- data |> 
  group_by(cv) |> 
  summarize(
    count = n()
  ) |> 
  arrange(-count)


