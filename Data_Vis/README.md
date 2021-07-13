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
    
### Planejamento Final

- Fazer uma análise temporal da evolução do falsete:
     - Utilizar visualizações voltadas para séries temporais:
          - Como são muitos anos acho que não dá pra usar um gráfico de radar, e também não tem comportamento sazonal;
          - Gráfico de linhas é uma boa opção nesse caso (Quando o objetivo é exibir como valores quantitativos mudam durante períodos contínuos de tempo, gráficos de linha são a opção mais precisa - Minardi, Raquel);
          - Gráfico de linhas e pontos pra comparar valores individuais;
          - Talvez uma boa abordagem pode ser ter esse gráfico tanto de barras quanto de linhas, e a pessoa pode escolher qual dos dois ver.
          - Um boxplot pode ser massa também, porque mostra a mediada e a distribuição do falsete em cada ano.
 - Capturar a relação entre gênero e o uso de falsete:
     - Com isso podemos ver se homens realmente estão fazendo mais falsetes;
     - Isso pode ser adicionado apenas como um filtro na visualização temporal, de maneira que seja possível selecionar apenas dados de mulheres e apenas dados de homens;
     - Porém se for apenas filtrar acredito que pode haver aquele problema de memorizar os dados, seria bom alguma forma de visualizar lado a lado:
          - Talvez um gráfico de barras agrupadas, mas ele não passa tão bem a noção da parte-todo;
          - Um gráfico de barras empilhadas passa a noção de parte todo, mas é difícil de calcular as categorias, como são apenas duas categorias, acho que rola;
          - Ou então aqueles gráficos legais cheios de pontinhos (Bee Swarm Plot ou Unit Plot), mas acho que pode ser dado demais pra plotar em bolinhas;
          - Talvez mostrar um gráfico de áreas agrupadas, daqueles bonitos que a Raquel mostrou. Aquela maluquice de seguir uma curva de rio, podemos ver se é fácil no D3.
 - Identificar as principais características dessa técnica vocal:
     - Aqui podemos analisar como o falsete se adapta às características do Spotify:
          - Plotar vários gráficos de correlação, de falsete x métrica específica, e juntar no formato de pequenos múltiplos;
          - Aquele gráfico de radar com as métricas, avalia o ano em que a métrica foi mais relevante, se juntar isso com um gráfico ao lado mostrando as décadas que o falsete mais apareceu pode ser legal. Acho que um gráfico de radar igual mesmo, mas só com o falsete do lado, pode ser chique.
          - Esse gráfico de radar mostra uma análise mais geral dos dados, porque eu agrupei por décadas, uma maneira de ver séries temporais assim com muito mais dados seria plotar uma mapa de calor.
