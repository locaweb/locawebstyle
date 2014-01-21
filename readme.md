Locaweb Style Guide
=================

[![Build Status](https://api.travis-ci.org/locaweb/locawebstyle.png?branch=master)](https://travis-ci.org/locaweb/locawebstyle)

O Locaweb Style são os padrões de interface utilizados nos produtos da Locaweb. Ele explora um simples e flexível HTML, CSS e Javascript para as necessidades comuns na manutenção e criação dos nossos serviços.

Este projeto foi criado para manter uma uniformidade da identidade de todas as interfaces dos produtos da Locaweb. Outro objetivo importante é a padronização do código front-end, melhorando a perfomance de produção, facilitando o aprendizado de novos integrantes e agilizando a implementação de novas ideias.

Com essa estrutura, a Locaweb integra de forma consistente as necessidades de interface e programação, trabalhando em um código client-side robusto e escalável. Assim mantemos a fidelidade do layout sob um código limpo e enxuto, que se adequa às necessidades dos programadores.

Caso você tenha alguma sugestão para melhorar a inteligência destes códigos, entre em contato conosco. Novas idéias são sempre bem vindas.
________

Instalando e contribuindo
=================
Mas que coisa linda você contribuir com seu código. Seja bem-vindo.

Embora só utilizemos arquivos estáticos no [Locaweb Style](http://developer.locaweb.com.br/locawebstyle/), toda a estrutura é baseada em ruby/rails para compilarmos os assets. Por isso você precisa saber como rodar aplicações rails em sua máquina. Se você não sabe, [dá uma procurada no Google](http://lmgtfy.com/?q=como+rodar+rails). Se você já sabe fazer isso, basta clonar o projeto e rodar a aplicação. Rode um bundle da vida para poder instalar alguma dependência e etc…

Arquivos
---
Todos os arquivos que criamos estão dentro de app/assets/javascripts e app/assets/stylesheets.
Os arquivos de terceiros estão dentro da pasta /vendor/assets/javascripts e /vendor/assets/stylesheets. Nestas pastas você encontra por exemplo o Bootstrap, jQuery e etc...

----


Baseado em que?
-----------
Este projeto foi baseado em alguns frameworks já conhecidos de todos os desenvolvedores

***Bootstrap***

Os estilos e comportamentos foram baseados no Bootstrap, framework criado pelo [Mark Otto](http://twitter.com/mdo/) e [Jacob Thornton](http://twitter.com/fat) para agilizar a criação de interface do Twitter.

Se você não conhece, visite o [site](http://getbootstrap.com/) do projeto, ou o [repositório](http://github.com/twbs/bootstrap) no github.

*Curiosidade* --
Dentro do Bootstrap eles usam o Normalize, que é um CSS Reset bastante completo. Ele reseta e compatibiliza alguns problemas de textos e valores padrões em elementos HTML. O Normalize foi criado por [Nicolas Gallagher](http://github.com/necolas) e [Jonathan Neal](http://github.com/jonathantneal).
[Dê uma olhada no projeto](http://necolas.github.com/normalize.css/)

***JQuery***

O JQuery é o framework mais utilizado para controlar comportamentos de elementos e outras coisinhas mais. Acho que ele dispensa apresentações. [Link do projeto](http://jquery.com)

-----

***Changelog***

Para verificar o changelog, visite a página oficial: [http://locaweb.github.io/locawebstyle/changelog/](http://locaweb.github.io/locawebstyle/changelog/)

Está procurando a documentação da primeira versão do Locastyle? [Vá para este link](http://locaweb.github.io/locawebstyle/v1/).