#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <vector>
#include <cassert>

using namespace std;

vector<string> split(string s) {
	s += ',';
	string at;
	vector<string> ret;
	int aspas = 0;
	for (int i = 0; i < s.size(); i++) {
		if (s[i] == '"') {
			aspas ^= 1;
			continue;
		}
		if (!aspas and s[i] == ',') {
			ret.push_back(at);
			at.clear();
		} else at += s[i];
	}
	return ret;
}

int main() {
	ifstream file("../MIR/dataframe.csv");

	int year_idx = -1, gender_idx = -1, falsetto_idx = -1;
	string s;
	getline(file, s);
	vector<string> v = split(s);
	for (int i = 0; i < v.size(); i++) {
		if (v[i] == "year") year_idx = i;
		if (v[i] == "gender") gender_idx = i;
		if (v[i] == "falsetto") falsetto_idx = i;
	}

	assert(year_idx != -1 and gender_idx != -1 and falsetto_idx != -1);

	map<int, map<string, double>> mp;
	map<int, map<string, int>> cnt;

	while (getline(file, s)) {
		v = split(s);
		int year = -1;
		string gender;
		double falsetto = -1;
		for (int i = 0; i < v.size(); i++) {
			if (i == year_idx) year = stoi(v[i]);
			if (i == gender_idx) gender = v[i];
			if (i == falsetto_idx) falsetto = stod(v[i]);
		}
		assert(year != -1 and gender.size() > 0 and falsetto != -1);

		mp[year][gender] += falsetto;
		cnt[year][gender]++;
	}

	cout << "year,male,female" << endl;

	for (auto& [year, x] : mp) {
		cout << year << ",";
		cout << x["male"] / cnt[year]["male"];
		cout << ",";
		cout << x["female"] / cnt[year]["female"];
		cout << endl;
	}
	
	file.close();
	return 0;
}
