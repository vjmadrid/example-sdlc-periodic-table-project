# Contraste por tema (WCAG, mínimo 4,5:1)

Calculado desde las variables de `styles.css`. «Atenuada» aplica `--dim-opacity` (0,75 claro; 0,88 oscuro y nocturno) a texto y fondo de la celda sobre `--bg`. Con 0,75 los temas oscuros bajaban a 3,98:1, por eso se subió.

| Par | Claro | Oscuro | Nocturno |
|---|---|---|---|
| texto / fondo | 14.11 | 14.73 | 11.76 |
| texto atenuado / fondo | 7.27 | 9.26 | 7.98 |
| texto / surface (ficha, búsqueda) | 14.76 | 12.92 | 11.10 |
| texto atenuado / surface | 7.60 | 8.12 | 7.53 |
| foco / fondo | 6.41 | 8.50 | 10.47 |
| aviso de error / surface | 11.00 | 9.42 | 9.87 |
| alkali (activa) | 11.13 | 6.92 | 7.96 |
| alkali (atenuada) | 5.35 | 6.06 | 6.61 |
| alkaline (activa) | 11.96 | 5.50 | 7.04 |
| alkaline (atenuada) | 5.65 | 4.92 | 5.99 |
| transition (activa) | 13.18 | 4.99 | 6.19 |
| transition (atenuada) | 6.08 | 4.53 | 5.31 |
| post-transition (activa) | 11.77 | 5.04 | 5.86 |
| post-transition (atenuada) | 5.59 | 4.56 | 5.12 |
| metalloid (activa) | 11.52 | 5.18 | 6.73 |
| metalloid (atenuada) | 5.51 | 4.68 | 5.79 |
| nonmetal (activa) | 11.29 | 5.73 | 6.70 |
| nonmetal (atenuada) | 5.40 | 5.14 | 5.76 |
| halogen (activa) | 10.57 | 6.28 | 5.55 |
| halogen (atenuada) | 5.15 | 5.56 | 4.89 |
| noble (activa) | 10.53 | 5.94 | 7.66 |
| noble (atenuada) | 5.15 | 5.28 | 6.41 |
| lanthanide (activa) | 10.61 | 5.72 | 7.70 |
| lanthanide (atenuada) | 5.15 | 5.10 | 6.43 |
| actinide (activa) | 10.60 | 5.47 | 7.14 |
| actinide (atenuada) | 5.16 | 4.90 | 6.03 |

Mínimo global: 4.53:1 (todos los pares ≥ 4,5).

Luminosidad relativa del fondo: Claro 0.9541, Oscuro 0.0091, Nocturno 0.0029 (nocturno < oscuro).
