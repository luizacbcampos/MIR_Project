import pandas as pd
import os
import numpy as np

df = pd.read_csv("./MIR/dataframe.csv", dtype={"falsetto":int})
df = df[["year", "falsetto"]]
df["count"] = 0

df = df.groupby(["year", "falsetto"]).count()

idx = pd.MultiIndex.from_product([df.index.levels[0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
df = df.reindex(idx, fill_value=0)
print(df)

df.to_csv("falsetto_by_year.csv")