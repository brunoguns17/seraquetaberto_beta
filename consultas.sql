--GET/usuarios
select * from usuarios;

--GET/usuarios/id
select * from usuarios where id =1;

--POST/usuarios
insert into usuarios(id,nome,idade)
values (1,'joao',13);