import pandas as pd
import numpy as np
import os
import csv

FULL_PATH = "/home/luiza/estudo/8º período/MIR/falsetto/full/"
ANN_PATH = "/home/luiza/estudo/8º período/MIR/falsetto/data-analysis/"

def unify(x, col):
	if pd.isnull(x[(col+'_x')]): #se x é NaN usa o Y
		return x[(col+'_y')]
	if pd.isnull(x[(col+'_y')]): #se x n é NaN e Y é
		return x[(col+'_x')]
	elif x[(col+'_x')] == x[(col+'_y')]: #ambos existem e são iguais
		return x[(col+'_x')]
	else:
		return np.nan

def first_merge(save='merge.csv'):
	data = pd.read_csv(FULL_PATH+'data.csv')
	print("data {}".format(data.shape))
	#print(data.loc[data.artist_name == 'Jefferson Airplane', ['artist_name', "song_title",'gender']])
	#print(data.loc[data.artist_name == "Herb Alpert", ['artist_name', "song_title",'gender']])
	#print(data.tail(10))

	repeat_years = pd.read_csv(FULL_PATH+'full_repeat_years.csv')
	print("repeat_years {}".format(repeat_years.shape))
	#print(repeat_years.tail(10))


	result = pd.merge(data, repeat_years, how="outer", on=["artist_name", "song_title", "year", "peak_rank"])
	#result['pandora_id_y'] = pd.to_numeric(result['pandora_id_y'], errors='coerce')
	print("merge ({}): {}".format(result.shape,  result.columns.values.tolist()))
	pandora = result[['pandora_id_x', 'pandora_id_y']]
	def check_id(x):
		if pd.isnull(x['pandora_id_x']): #se x é NaN usa o Y
			return x['pandora_id_y']
		if pd.isnull(x['pandora_id_y']): #X existe e Y é Nan
			return x['pandora_id_x']
		elif x['pandora_id_x'] == x['pandora_id_y']: #ambos existem e são iguais
			return x['pandora_id_x']
		else:							#são diff e nenhum é NaN
			return x['pandora_id_y']

	result['pandora_id']= result.apply(lambda x : check_id(x),axis=1)
	result.drop(columns=['pandora_id_x', 'pandora_id_y'], inplace=True)
	print("id {}: {}".format(result.shape, result.columns.values.tolist()))

	#print(result[['gender_x', 'gender_y']].apply(tuple, axis=1).value_counts())
	result['gender'] = result.apply(lambda x : unify(x,'gender'),axis=1)
	result.drop(columns=['gender_x', 'gender_y'], inplace=True)
	print("gender {}: {}".format(result.shape, result.columns.values.tolist()))

	#print(result[['genre_x', 'genre_y']].apply(tuple, axis=1).value_counts())
	result['genre'] = result.apply(lambda x : unify(x,'genre'),axis=1)
	result.drop(columns=['genre_x', 'genre_y'], inplace=True)
	print("genre {}: {}".format(result.shape, result.columns.values.tolist()))

	#print(result[['falsetto_x', 'falsetto_y']].apply(tuple, axis=1).value_counts())
	result['falsetto'] = result.apply(lambda x : unify(x,'falsetto'),axis=1)
	result.drop(columns=['falsetto_x', 'falsetto_y'], inplace=True)
	print("falsetto {}: {}".format(result.shape, result.columns.values.tolist()))

	#print(result[['register_x', 'register_y']].apply(tuple, axis=1).value_counts())
	result['register'] = result.apply(lambda x : unify(x,'register'),axis=1)
	result.drop(columns=['register_x', 'register_y'], inplace=True)
	print("register {}: {}".format(result.shape, result.columns.values.tolist()))

	#print(result[['spoken_x', 'spoken_y']].apply(tuple, axis=1).value_counts())
	result['spoken'] = result.apply(lambda x : unify(x,'spoken'),axis=1)
	result.drop(columns=['spoken_x', 'spoken_y'], inplace=True)
	print("spoken {}: {}".format(result.shape, result.columns.values.tolist()))


	def initial_match_check(result):
		#print(result[['initial_match_x', 'initial_match_y']].apply(tuple, axis=1).value_counts())
		s = pd.Series(result['initial_match_x']).compare(pd.Series(result['initial_match_y']), align_axis=1)

		def unify_initial_match(x):
			if pd.isnull(x['initial_match_x']): #se x é NaN usa o Y
				return x['initial_match_y']
			if pd.isnull(x['initial_match_y']): #se x n é NaN e Y é
				return x['initial_match_x']
			elif x['initial_match_x'] == x['initial_match_y']: #ambos existem e são iguais
				return x['initial_match_x']
			else: #são difentes mas não NaN
				if x['initial_match_x'] == True:
					return x['initial_match_x']
				else:
					return x['initial_match_y']
		
		result['initial_match'] = result.apply(lambda x : unify_initial_match(x),axis=1)
		return result['initial_match']

	result['initial_match'] = initial_match_check(result)
	result.drop(columns=['initial_match_x', 'initial_match_y'], inplace=True)
	print("initial_match {}: {}".format(result.shape, result.columns.values.tolist()))


	result.dropna(subset=['falsetto'], inplace=True)
	print("Drop falsetto NaN: {}".format(result.shape))
	result = result.drop_duplicates()
	print("Drop duplicates: {}".format(result.shape))

	#remove duplicates of type: same artist/song but diff preview_url
	reduce_dup = result.sort_values('preview_url', na_position='last').drop_duplicates(["artist_name", "song_title"], keep='first')
	reduce_dup = reduce_dup.index.to_list() #indexes to keep
	result = result.loc[reduce_dup]
	print("Drop duplicated preview_url: {}".format(result.shape))

	#duplicates of type: same artist/song buf diff pandora_id
	reduce_dup = result
	reduce_dup['pandora_id'] = pd.to_numeric(reduce_dup['pandora_id'])
	reduce_dup = reduce_dup.sort_values('pandora_id', na_position='last').duplicated(['pandora_id'], keep='first')
	result = result.loc[reduce_dup.index.to_list()]
	print("Drop duplicated pandora_id: {}".format(result.shape))

	print("Checking NaN values")
	null = result.columns[result.isnull().any()].tolist()
	
	def correct_gender(index):
		mini = result.loc[index, ['artist_name', 'song_title', 'gender']]
		artist = mini['artist_name']
		#print("Artist: ", artist," | ", end=' ')
		#print(mini.to_frame().T)
		check = result.loc[result.artist_name == artist, ['artist_name', 'gender']].gender.value_counts(dropna=False)
		lista = check.index.to_list()
		if len(check) == 1:
			return np.nan
		if len(check) == 2:
			if pd.isnull(lista[0]) or lista[0] == 'duet':
				return lista[1]
			elif pd.isnull(lista[1]) or lista[1] == 'duet':
				return lista[0]
			#aparece male e female
			#print("Double check em: {}\n{}".format(artist, check))
			return np.nan #lista[0]

		if len(check) == 3:
			if np.nan in lista:
				lista.remove(np.nan)
			if lista[0] == 'duet':
				return lista[0]
			if 'duet' in lista:
				lista.remove('duet')
			if len(lista) == 2:
				#aparece male e female
				#print("Double check em: {}\n{}".format(artist, check))
				return np.nan #lista[0]
			return lista[0]
		if len(check) == 4:
			if np.nan in lista:
				lista.remove(np.nan)
			if lista[0] == 'duet':
				return lista[0]
			if 'duet' in lista:
				lista.remove('duet')
			#aparece male e female
			#print("Double check em: {}\n{}".format(artist, check))
			return np.nan #lista[0]
		return np.nan
	
	#gender
	print("Correcting gender values")
	gender_list = result[result['gender'].isnull()].index.to_list()
	for index in gender_list:
		new_gender = correct_gender(index)
		if not pd.isnull(new_gender):
			result.at[index,'gender'] = new_gender
			#print("New gender should be ", new_gender)
		else:
			song = result.loc[index, 'song_title']
			artist = result.loc[index, 'artist_name']
			print("Artist: {} | Song: {}".format(artist, song))

	for col in null:
		#print(col)
		#print(result[result[col].isnull()])
		col =0 

	#reduce_dup = reduce_dup.sort_values('pandora_id', na_position='last').drop_duplicates(['pandora_id'], keep='first')
	#reduce_dup = list(set(result.index.to_list()) - set(reduce_dup.index.to_list())) #index to check
	#reduce_dup = reduce_dup.index.to_list() #indexes to keep
	#result = result.loc[reduce_dup]

	result.to_csv(FULL_PATH+save,index=False)

first_merge(save='outter_merge.csv')



#merge = pd.read_csv(FULL_PATH+'merge.csv')
#print(merge.shape)
#merge.dropna(subset=['pandora_id'], inplace=True)
#merge.drop_duplicates(subset=['pandora_id'], keep=False, inplace=True)
#print(merge.shape)
#print(merge[merge.duplicated(['pandora_id'], keep=False)][['pandora_id', "artist_name", "song_title", "preview_url"]].sort_values("pandora_id").head(40))

outter_merge = pd.read_csv(FULL_PATH+"outter_merge.csv")
print(outter_merge.shape)

columns = ['artist_name','track_name','preview_url','artist_title','spotify_id']
output = pd.read_csv(ANN_PATH+'output.csv', names=columns, quotechar='|', quoting=csv.QUOTE_MINIMAL)
output.dropna(subset=['spotify_id'], inplace=True)
#print("output")
#print(output.head(30))