import pandas as pd

df = pd.read_csv("./MIR/dataframe.csv")

decade = df["year"]
for i, year in enumerate(decade):
    decade.iloc[i] = str(year)[:-1]+"0"

df["decade"] = decade

print(df.groupby(['decade']).mean()[["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness"]])