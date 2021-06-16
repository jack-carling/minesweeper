![Logo](https://raw.githubusercontent.com/jensengbg-jack-carling/minesweeper/e471a123355f22b924b87df15b7977dc1b1edd17/src/assets/logo.svg)

## Demo

[Play on Heroku](https://minesweeper-ts.herokuapp.com/)

## Description

In Minesweeper, mines are scattered throughout the board, which is divided into cells. Cells have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed. Flagged cells are those marked by the player to indicate a potential mine location.

A player left-clicks a cell to uncover it. If a player uncovers a mined cell, the game ends, as there is only 1 life per game. Otherwise, the uncovered cells displays either a number, indicating the quantity of mines diagonally and/or adjacent to it, or a blank tile, and all adjacent non-mined cells will automatically be uncovered. Right-clicking on a cell will flag it, causing a flag to appear on it. Flagged cells are still considered covered, and a player can click on them to uncover them, although they must first be unflagged with an additional right-click.

If the first click is a left-click it will never be a mine in any game.

To win the game, players must uncover all non-mine cells, at which point, the timer is stopped. Flagging all the mined cells is not required.

## Install

```bash
npm install
npm run dev
```

## Double-click

If a player double-clicks an uncovered cell containing a number between 1-9 it will open all of the adjacent and diagonal cells if the adjacent and/or diagonal cells have the same number of flags as the cell clicked. This allows the game to be played at a faster pace since it doesn't require the player to click every single cell.

## Flagged win

Compared to certain versions of Minesweeper, this edition will check if the player wins in two different ways. Either the player uncoveres all non-mined cells, or the player has flagged all cells containing mines. This will ensure that the game cannot be lost at the end by a 50/50 guess for example.

## Custom games

The game board allows for customization of a width between 5-20 cells, a height between 5-15 and a maximum number of mines corresponding to 30% of the amount of total cells.

## Left to do

- [ ] How to play
- [ ] Highscores
- [ ] Mobile friendly, another way to place a flag
- [x] Responsive
- [x] Ranges for customization
- [x] Main menu remember last settings
- [x] Double click to reveal adjacent squares when correct number of flags
- [x] The first click in any game will never be a mine
- [x] Better sorting algorithm for mines in array
