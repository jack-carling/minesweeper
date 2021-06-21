[![Logo](https://raw.githubusercontent.com/jensengbg-jack-carling/minesweeper/e471a123355f22b924b87df15b7977dc1b1edd17/src/assets/logo.svg)](https://minesweeper-ts.herokuapp.com/)

## Demo

[Play on Heroku](https://minesweeper-ts.herokuapp.com/)

## Description

In Minesweeper, mines are scattered throughout the board, which is divided into cells. Cells have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed. Flagged cells are those marked by the player to indicate a potential mine location.

A player left-clicks a cell to uncover it. If a player uncovers a mined cell, the game ends, as there is only 1 life per game. Otherwise, the uncovered cells displays either a number, indicating the quantity of mines diagonally and/or adjacent to it, or a blank tile, and all adjacent non-mined cells will automatically be uncovered. Right-clicking on a cell will flag it, causing a flag to appear on it. Flagged cells are still considered covered, and a player can click on them to uncover them, although they must first be unflagged with an additional right-click.

If the first click is a left-click it will never be a mine in any game.

To win the game, players must uncover all non-mine cells, at which point, the timer is stopped. Flagging all the mined cells is not required.

## Installation

```bash
npm install
npm run dev
```

For the backend you will need a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account. Create a `.env` file in the root directory and insert `MONGO_DB=` followed by your connection string. To run the database open a second terminal:

```bash
npm start
```

## Responsive

The game is responsive and provides an alternative way to place flags on a mobile device. If the player holds down a cell for a bit longer instead of simply tapping it a flag will be placed instead. The flag can be removed by simply tapping the same cell again.

There is also a phone mode on smaller devices that will facilitate if the cells are rendered too small. If this mode is enabled the board can be scrolled left or right using two fingers.

## Chording

If a player clicks on an uncovered cell containing a number between 1-9 it will open all of the adjacent cells if the adjacent cells have the same number of flags as the cell clicked. This allows the game to be played at a faster pace since it doesn't require the player to click every single cell.

## Flagged win

Compared to certain versions of Minesweeper, this edition will check if the player wins in two different ways. Either the player uncovers all non-mined cells, or the player has flagged all cells containing mines. This will ensure that the game cannot be lost at the end by a 50/50 guess.

## Custom games

The game board allows for customization of a width between 5-20 cells, a height between 5-15 and a maximum number of mines corresponding to 30% of the amount of total cells.

## High scores

High scores are saved only with the users permission and are divided into four categories. Beginner, intermediate and expert will simply sort the high scores by time while custom will compare size with the amount of mines and sort by the highest number of mines per squares followed by shortest completion time. The top 25 scores are displayed.
