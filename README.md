
# Minimizr
Este minimizador de autómatas finitos de Moore y Mealy fue desarrollado utilizando react, typescript y scss.
## Guía de uso
Recomendaciones a tener en cuenta para que el proyecto funcione como se espera

### Sobre la ejecución del proyecto
Por ser un proyecto desarrollado con React, se debe contar con una versión de Node superior a la 16.11
Adicionalmente se recomienda instalar sass para el correcto funcionamiento del proyecto

El proyecto debe ser ejecutado mediante el comando 
```npm start ```
, además, se deben instalar las librerias utilizadas durante el desarrollo del mismo mediante el comando 
```npm install ```


### Sobre los formatos de los datos
#### Autómatas de Moore
* Las celdas de la columna 'Estados' debe tener una cadena que represente al estado, separada por una coma ',' y después de esta la salida del estado

* Las celdas de la columna 'Transiciones' necesitan dos cadenas separadas por una flecha '-->', del lado izquierdo se encuentra la entrada, y del lado derecho de la flecha se debe poner el estado al cual conduce

* Las celdas de la columna 'Resultados' representan las salidas del estado al que se llega al terminar la transición

#### Autómatas de Mealy
* Las celdas de la columna 'Estados' debe tener una cadena que represente al estado

* Las celdas de la columna 'Transiciones' necesitan dos cadenas separadas por una flecha '-->', del lado izquierdo se encuentra la entrada, y del lado derecho de la flecha se debe poner el estado al cual conduce

* Las celdas de la columna 'Resultados' representan las salidas del estado al que se llega al terminar la transición


### Sobre los tipos de datos
Los datos son tomados como strings, y aceptan cualquier carácter aceptado por el UTF-8. Se debe tener
en cuenta que para el correcto funcionamiento de la aplicación
no deben haber filas sin datos



## Authors

- [zacwastaken](https://www.github.com/zacwastaken)
- [KennetSanchez](https://www.github.com/kennetSanchez)


