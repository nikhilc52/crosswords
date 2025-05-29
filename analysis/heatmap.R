library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)

data <- read_csv('../crossword_representations.csv')

working <- data |> 
  mutate(size = str_count(representation)) |> 
  filter(size == 225)

heatmap <- data.frame()
index <- 1
#for 15x15 (225 length) crosswords
for (i in working$representation) {
  values <- c()
  xs <- c()
  ys <- c()
  for (j in 1:225){
    values <- append(values, substr(i, j, j))
    xs <- append(xs, (j-1) %% 15)
    ys <- append(ys, 14-floor((j-1)/15))
  }
  temp <- data.frame(
    X = xs,
    Y = ys,
    Z = values
  )
  heatmap <- rbind(heatmap, temp)
  print(index)
  index <- index+1
}

heatmap_cleaned <- heatmap |> 
  mutate(Z = ifelse(Z=='w', 0, 1)) |> 
  group_by(X, Y) |> 
  summarise(
    average = mean(Z)
  )

heatmap_cleaned |> 
  ggplot(aes(X, Y, fill= average)) + 
  geom_tile()+
  theme_bw()+
  geom_text(aes(label = round(average, 2), 
                color=ifelse(average >= 0.3, "white", "black"))) +
  scale_fill_gradient(high = "black", low = "white")+
  scale_color_identity()


