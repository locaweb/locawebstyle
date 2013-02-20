Locaweb Style Guide
=================

O Locaweb Style são os padrões de interface utilizados nos produtos da Locaweb. Ele explora um simples e flexível HTML, CSS e Javascript para as necessidades comuns na manutenção e criação dos nossos serviços.

Este projeto foi criado para manter uniforme a identidade de todas as interfaces dos produtos da Locaweb. Outro objetivo importante para tal iniciativa é a uniformização do código da Locaweb, melhorando a perfomance de produção, facilitando o aprendizado de novos integrantes e agilizando a implementação de novas ideias.

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

Se você não conhece, visite o github do projeto e conheça já!
[Bootstrap](twitter.github.com/bootstrap/)

*Curiosidade* -- 
Dentro do Bootstrap eles usam o Normalize, que é um CSS Reset bastante completo. Ele reseta e compatibiliza alguns problemas de textos e valores padrões em elementos HTML. O Normalize foi criado por [Nicolas Gallagher](@necolas) e [Jonathan Neal](@jon_neal).
[Dê uma olhada no projeto](http://necolas.github.com/normalize.css/)

***JQuery***

O JQuery é o framework mais utilizado para controlar comportamentos de elementos e outras coisinhas mais. Acho que ele dispensa apresentações. [Link do projeto](http://jquery.com)


***Modernizr***

O Modernizr é um script de detecção de suporte HTML5. Ele nos avisa se o browser suporta ou não suporta as novas propriedades do CSS, nos dando a possibilidade de criar fallbacks para os browsers incompatíveis. Assim fica muito fácil saber qual browser suporta ou não SVG, Canvas, RGBA, drop shadow, gradiente e tudo o mais.

Ele foi criado por desenvolvedores muito renomados como [Paul Irish](http://paulirish.com/) e [Faruk Ates](http://farukat.es/). [Site do projeto](http://www.modernizr.com/)

***Select2***

[Select2](http://ivaynberg.github.com/select2/) é um plugin para customização de selects (ou como muitos chamam “combo box”) muito útil e flexível. Ele é o melhor plugin para executar essa tarefa por que ele mantém a acessibilidade. Você consegue navegar via teclado e etc. Para ver como o Locaweb Style utiliza, [visite esse link](http://developer.locaweb.com.br/locawebstyle/formularios/entendendo-os-selects/).

***Masked Input***

[Masked Input](http://digitalbush.com/projects/masked-input-plugin/) é um plugin para a criação de máscaras para formulários. É muito simples de utilizar. Para ver seu funcionamento, [clique aqui](http://developer.locaweb.com.br/locawebstyle/formularios/mascaras-formularios/).

-----

***Changelog***

Para verificar o changelog, visite a página oficial: [http://developer.locaweb.com.br/locawebstyle/introducao/changelog/](http://developer.locaweb.com.br/locawebstyle/introducao/changelog/)
