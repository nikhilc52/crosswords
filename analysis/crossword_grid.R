library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(gganimate)

#reading the files
setwd("~/GitHub/crosswords/analysis")

data <- read_csv('../crossword_representations.csv')

data <- data |> 
  mutate(date = as.Date(date, format = "%m/%d/%Y"))

#representation of the most frequent puzzle grid
most_frequent_puzzle <- data |> 
  filter(date == '1998-10-19')

heatmap <- data.frame()
values <- vector("list", 225)
xs <- vector("list", 225)
ys <- vector("list", 225)

for (j in 1:225){
  values[j] <- substr(most_frequent_puzzle$representation[1], j, j)
  xs[j] <- (j-1) %% 15
  ys[j] <- 14-floor((j-1)/15)
}

heatmap <- data.frame(
  X = unlist(xs),
  Y = unlist(ys),
  Z = unlist(values)
)

#shows a particular heatmap (most common grid)
heatmap |> 
  mutate(Z = ifelse(Z=='w', 0, 1)) |> 
  ggplot(aes(X, Y)) + 
  geom_tile(aes(fill= Z), color="black")+
  theme_void()+
  scale_fill_gradient(high = "black", low = "white")+
  scale_color_identity()
