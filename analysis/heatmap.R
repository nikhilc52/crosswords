library(tidyverse)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(gganimate)

#reading the files
setwd("~/GitHub/crosswords/analysis")

data <- read_csv('../crossword_representations.csv')

#percent of the puzzles that are unique grids
num_unique_puzzles <- length(unique(data$representation))

#representation of the most frequent puzzle grid
most_frequent_puzzle <- data |> 
  group_by(representation) |> 
  summarise(
    count = n()
  ) |> 
  arrange(-count) |> 
  head(1)

#copied code from below, fitted to above
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


working <- data |> 
  mutate(size = str_count(representation)) |> 
  filter(size == 225)

#make an empty df
heatmap <- data.frame()
index <- 1
#lists with 15*15*#crosswords slots
values <- vector("list", 225*nrow(working))
xs <- vector("list", 225*nrow(working))
ys <- vector("list", 225*nrow(working))
dates <- vector("list",225*nrow(working))

#for 15x15 (225 length) crosswords
for (i in working$representation) {
  #for each character/tile
  for (j in 1:225){
    #set the value for each character
    values[225*(index-1)+j] <- substr(i, j, j)
    #find the x/y coordinate
    xs[225*(index-1)+j] <- (j-1) %% 15
    ys[225*(index-1)+j] <- 14-floor((j-1)/15)
    #get the date
    dates[225*(index-1)+j] <- working$date[index]
  }
  print(index)
  index <- index+1
}

#set the heatmap dataframe with the values from above
heatmap <- data.frame(
  X = unlist(xs),
  Y = unlist(ys),
  Z = unlist(values),
  date = unlist(dates)
) |> 
  mutate(date_obj = as.Date(date, format = "%m/%d/%Y")) |> 
  mutate(year = as.numeric(format(date_obj, "%Y")))

#get yearly data for each square
heatmap_year <- heatmap |> 
  mutate(Z = ifelse(Z=='w', 0, 1)) |> 
  group_by(X, Y, year) |> 
  summarise(
    average = mean(Z)
  ) |> 
  filter((year != '2025') & (year != '1993'))

#get general data for all crosswords
heatmap_cleaned <- heatmap |> 
  mutate(Z = ifelse(Z=='w', 0, 1)) |> 
  group_by(X, Y) |> 
  summarise(
    average = mean(Z)
  )

#meant for a 1500x1500 image, all crosswords
heatmap_cleaned |> 
  ggplot(aes(X, Y, fill= average)) + 
  geom_tile()+
  theme_void()+
  #geom_text(aes(label = scales::percent(average, 0.1), 
  #              color=ifelse(average >= 0.3, "white", "black")), size=7) +
  scale_fill_gradient(high = "black", low = "white")+
  scale_color_identity()

#meant for a 1500x1500 image, heatmap per year
animation <- heatmap_year |> 
  ggplot(aes(X, Y)) + 
  geom_tile(aes(fill= average))+
  theme_void()+
  labs(subtitle = "{round(frame_time)}")+
  scale_fill_gradient(high = "black", low = "white", 
                      limits=c(0, .55), breaks=seq(0,0.55,by=0.05))+
  scale_color_identity()+
  transition_time(year)

animate(animation, fps=5, duration=18, end_pause=10, width = 7.5, height = 7.5,
        units = "in", res = 200)

#meant for a 1500x1500 image, true representations of puzzles
animation <- heatmap |> 
  mutate(Z = ifelse(Z=='w', 0, 1)) |> 
  ggplot(aes(X, Y)) + 
  geom_tile(aes(fill= Z), color="black")+
  theme_void()+
  #labs(subtitle = "{frame_time}")+
  scale_fill_gradient(high = "black", low = "white")+
  scale_color_identity()+
  transition_time(date_obj)

animate(animation, fps=2, duration=20, width = 7.5, height = 7.5,
        units = "in", res = 200)



