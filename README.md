# Atividade RabbitMQ

## Qual a principal diferença entre cada exemplo dos tutoriais seguidos?

O primeiro tutorial era, claro, o mais simples de todos, mostrando apenas a implementação básica de um cara que ia mandar e outro que ia receber para uma fila. Já no segundo, vimos algumas maneiras para deixar os programas mais robustos, com alguns detalhes como persistência das mensagens, paralelização de trabalho e balanceamento com workers. Por fim, no terceiro vemos um exemplo completo baseado no modelo publish/subscribe.

## Suponha que o seu servidor de filas (rabbitmq-server) está executando e possui filas que contém mensagens ainda não consumidas, e acidentalmente a máquina em que ele roda reinicia, como se pode garantir que as mensagens estarão salvas quando o servidor de filas voltar a funcionar?

Pelo que eu entendi, seria marcando as mensagens com `persistence` sendo `true`. Pelo que estou vendo por [esse link](https://www.rabbitmq.com/persistence-conf.html#:~:text=Persistent%20messages%20will%20be%20written,from%20memory%20under%20memory%20pressure.) as mensagens marcadas como persistentes são gravadas em disco assim que chegam na fila, ao contrário das mensagens comuns que são gravadas apenas em memória (podendo ser salvas em disco de maneira temporária só em caso de a memória estar ficando cheia).
