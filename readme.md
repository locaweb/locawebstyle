

![Travis:Master](https://travis-ci.org/locaweb/locawebstyle.svg?branch=master "Travis Master")

-

![Locaweb Style with Gold color](http://i.imgur.com/3mBJPr4.png "Locaweb Style")


# Locastyle 3.0 (Barbecue)
This is a front-end framework with patterns of behaviors and styles to web projects. The focus of this framework is build admin interfaces and not websites. We design this interface with a team of UX and Front-end. We also use this interface in our own products here in Locaweb.

You can see [all examples in this link](http://locaweb.github.io/locawebstyle/documentacao/exemplos/).

### How to install:
You can [use the Locaweb Style in many ways](http://locaweb.github.io/locawebstyle/documentacao/introducao/), but we suggest use direct of our server just adding this address in your project:

```html
<head>
...
  <!-- Insert the CSS in HEAD -->
  <link rel="stylesheet" type="text/css" href="//assets.locaweb.com.br/locastyle/3.7.4/stylesheets/locastyle.css">
...
</head>
<body>
  <!-- Your code -->

  <!-- JQuery is a dependency -->
  <script src="http://code.jquery.com/jquery-2.0.1.min.js">

  <!-- Put the JS in your footer, always after jQuery (dependency) -->
  <script src="//assets.locaweb.com.br/locastyle/3.7.4/javascripts/locastyle.js"></script>
</body>
```


#### Installing via [bower](http://bower.io)

To install the Locaweb Style using Bower:

```sh
$ bower install locawebstyle
```

### Read the manual
We maintain the [docs of components and how they works here](http://locaweb.github.io/locawebstyle/documentacao/introducao/). If you use the Chrome, [download here our extension](http://locaweb.github.io/locawebstyle/documentacao/introducao/chrome/) to access the documentation more easily.

### Do you want contribute?
Contribute is easy: make a fork and start to code. :-)
We have some instructions maintain the code more legible and organized. Sorry, this article still in portuguese and you can [read here these instructions.](http://locaweb.github.io/locawebstyle/documentacao/introducao/contribua/).

[Read here the code guide of CSS](http://locaweb.github.io/locawebstyle/documentacao/praticas/css/) and [JavaScript](http://locaweb.github.io/locawebstyle/documentacao/praticas/javascript/) to maintain a good practices of this project.

### Running tests
Before sending any code, please run our automated tests:
```sh
$ bundle exec rake tests:run
```
It will run Jasmine tests and JShint.

---
**pt-br version**

# Locastyle 3.0 (Barbecue)
Um framework front-end de comportamento e estilo para projetos web, com uma interface usada por milhares de usuários. Mantido pelos desenvolvedores front-end da [Locaweb](http://locaweb.com.br/).

Você pode ver [exemplos de painéis neste link](http://locaweb.github.io/locawebstyle/documentacao/exemplos/).

### Use o Locaweb Style
Você pode usar o Locaweb Style de várias formas: [direto pelo nosso servidor](//assets.locaweb.com.br/locastyle/3.7.4/javascripts/locastyle.js), via Bower ou baixando os assets para usar offline.

#### Utilizando pelo nosso servidor

```html
<head>
...
  <!-- Insert the CSS in HEAD -->
  <link rel="stylesheet" type="text/css" href="//assets.locaweb.com.br/locastyle/3.7.4/stylesheets/locastyle.css">
...
</head>
<body>
  <!-- Your code -->

  <!-- JQuery is a dependency -->
  <script src="http://code.jquery.com/jquery-2.0.1.min.js">

  <!-- Put the JS in your footer, always after jQuery (dependency) link -->
  <script src="//assets.locaweb.com.br/locastyle/3.7.4/javascripts/locastyle.js"></script>
</body>
```

#### Instalação via [bower](http://bower.io)

Para instalar o Locaweb Style utilizando o Bower é bem simples:

```sh
$ bower install locawebstyle
```

### Documentação completa
Mantemos a [documentação completa dos componentes e como eles funcionam aqui](http://locaweb.github.io/locawebstyle/documentacao/introducao/). Se você usar o Chrome, [baixe nossa extensão](http://locaweb.github.io/locawebstyle/documentacao/introducao/chrome/) para facilitar o acesso à documentação.

### Quer contribuir?
Para contribuir é bico: Faça um fork do projeto aqui mesmo no GitHub e comece a codar! ;-)
Existem algumas instruções para mantermos o código legível e organizado. [Leia essas instruções aqui](http://locaweb.github.io/locawebstyle/documentacao/introducao/contribua/).

Leia também nossos padrões de código de [CSS](http://locaweb.github.io/locawebstyle/documentacao/praticas/css/) e [JavaScript](http://locaweb.github.io/locawebstyle/documentacao/praticas/javascript/).

### Rodando os tests
Antes de enviar seu código, rode nossa suite de testes:
```sh
$ bundle exec rake tests:run
```
Isso vai rodar os testes de Jasmine e o JShint.
