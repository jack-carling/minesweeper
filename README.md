# Minesweeper

## Description

In Minesweeper, mines are scattered throughout the board, which is divided into cells. Cells have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed. Flagged cells are those marked by the player to indicate a potential mine location.

A player left-clicks a cell to uncover it. If a player uncovers a mined cell, the game ends, as there is only 1 life per game. Otherwise, the uncovered cells displays either a number, indicating the quantity of mines diagonally and/or adjacent to it, or a blank tile, and all adjacent non-mined cells will automatically be uncovered. Right-clicking on a cell will flag it, causing a flag to appear on it. Flagged cells are still considered covered, and a player can click on them to uncover them, although typically they must first be unflagged with an additional right-click.

To win the game, players must uncover all non-mine cells, at which point, the timer is stopped. Flagging all the mined cells is not required.

## Install

```bash
npm install
npm run dev
```

## Flagged win

Compared to certain versions of Minesweeper, this edition will check if the player wins in two different ways. Either the player reveals all non-mined cells, or the player has flagged all cells containing mines. This will ensure that the game cannot be lost at the end by a 50/50 guess for example.

## Custom games

The game board allows for customization of a width between 5-20 cells, a height between 5-15 and a maximum number of mines corresponding to half the amount of total cells.

## Left to do

- [x] Ranges for customization
- [x] Main menu remember last settings
- [x] Double click to reveal adjacent squares when correct number of flags
- [ ] How to play
- [ ] The first click in any game will never be a mine
- [ ] Better sorting algorithm for mines in array
