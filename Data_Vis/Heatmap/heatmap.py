import pandas as pd
import os

df = pd.read_csv("./MIR/dataframe.csv", dtype={"falsetto":int})
df = df[["year", "falsetto"]]
df["count"] = 0
df = df.groupby(by=["year", "falsetto"], as_index=False).count()

print(df)

# for i in range(11):
# 	col = str(i)
# 	df[col] = 0

# for index, row in df.iterrows():
# 	fal = str(row["falsetto"])
# 	df.at[index, fal] = row["count"]
# print(df)

# df = df.groupby('year', as_index=False).sum()
# df = df[["year", "0","1", "2", "3","4", "5", "6", "7", "8", "9", "10"]]
# print(df)
df.to_csv("falsetto_by_year.csv", index=False)