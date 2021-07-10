# Falsetto Visualization Project

* [Links Uteis](#links-uteis)
* [Informações CORS](#cors)
* [Ideias](#ideias)

## Links Uteis:

1. [Exemplos do D3 (show)](https://github.com/richardadalton/d3examples)
1. [Link da Luiza (nao sabemos se eh show)](https://www.d3-graph-gallery.com/intro_d3js.html)
1. [Sobre JS](http://learnjsdata.com/getting_started.html)
1. [D3 Tutorials](https://github.com/d3/d3/wiki/Tutorials)
1. [csv no D3](https://charlesreid1.com/wiki/D3#Loading_Single_CSV_File)
1. [Dicas ótimas para pequenos detalhes](https://www.d3-graph-gallery.com/index.html)

## CORS

Esse problema aconteceu comigo e com a Isadora. Tem duas formas de lidar. 

#### 1. O erro:
> Access to script at 'file://*' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.

O erro é basicamente: seu `index.html` está começando com *https* e você quer acessar algo que começa com *file://*. Sim, eu sei que seu arquivo também está em file, mas o Chrome e o Firefox discordam. Não tem muito o que fazer. 

##### 2. Como lidar?

Tem dois jeitos:
1. Uma opção fácil é só pegar os arquivos usando raw.github e etc. Como nesse exemplo aqui:
```javascript
<script crossorigin="anonymous">
     d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/MIR/dataframe.csv", function(data)
         {
             // here's where we do stuff with the data
             // Do something with d3.js
         });
</script>
```
2. Uma outra opção, e ela soluciona de vez é essa [aqui](https://stackoverflow.com/a/21608670). Ela usa Python:
   1. No terminal vá para o diretório onde seu arquivo(s) `some.html` está;
   1. Inicie um servidor web Python usando o comando `python -m http.server`
   2. Isso vai iniciar um servidor web em http://localhost:8000
   3. Para customizar o port `python -m http.server 9000` dando o link: http://localhost:9000

## Ideias
> Obs: tem que ter um gráfico interativo

_**Primeiro mostra o geral, depois afunila**_ 
_Ela gosta de séries temporais:_

 - Mostrar a evolução do uso de falsette ao longo dos anos;
    - Ganhar embasamento;
    - Testar aquele gráfico ciclico (gráfico de radar);
    - Gráfico de radar por estilo musical

 - Uma opção é usar a média do ano. Então você clica no ano e usa a música mais popular que está na (ou logo acima da média);
    - Usando o spotify e etc; 
    - Dividir em média, média masc, média fem
- Ver como o falsetto se adapta às características do Spotify
    - Ex. plotar dancebility vs falsetto

- Comparar artistas? 
    - Comparar artista por métrica (acoustic, falseto, danceability, etc)
    - Seria uma opção por filtro


## Visualizações de referência:
- [Gráfico de radar bonito porém sem legenda](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242)
- [Explicação para a criação do gráfico de radar bonito](https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart/)
- [Gráfico de radar feio com legenda interativa](https://github.com/alangrafu/radar-chart-d3)