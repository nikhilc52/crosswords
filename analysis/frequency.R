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
  )

frequencies_day <- data |> 
  group_by(date) |> 
  summarize(
    day = first(day),
    count_frequent_words = sum(answer %in% c('ERA','AREA','ERE','ONE','ELI','ORE','ATE','ALE','ETA','ARE'))
  ) |> 
  mutate(contains_frequent_word = ifelse(count_frequent_words > 0, 1, 0)) |> 
  group_by(day) |> 
  summarize(
    count_days = n(),
    days_with_frequent_word = sum(contains_frequent_word)
  ) |> 
  mutate(percent_frequent = days_with_frequent_word/count_days)

frequencies |> 
  arrange(-count) |> 
  head(10) |> 
  ggplot(aes(x=reorder(answer, -count), y=count))+
  theme_bw()+
  ylim(0,800)+
  geom_bar(stat="identity")

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
  arrange(-count) |> 
  mutate(freq = count / nrow(data))


