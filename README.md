# Chart Data Filter

## Project features

- **TypeScript React SPA**, `createContext` for state managemenent
- **Dynamic chart data**, Powered by MUI
- **Different time and currency formats**, Time format with DayJS library

#### Spent time

16 hours

#### The most challenging moments

I had to pick up MUI quickly to stylise it and format the data,
but the most complicated part was to implement the observer pattern and state management.

**Video demonstarion**
[![Chart Data Filter](https://github.com/user-attachments/assets/2060affe-d6fe-437d-bfdd-2fa12e7f848b)](https://youtu.be/83TsqZOL-qI "Chart Data Filter")

| **Loading**                                                                                     | **No data**                                                                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Loading](https://github.com/user-attachments/assets/71bbce6e-81fc-4e6e-9fc1-5922b4f97c42)     | ![No data](https://github.com/user-attachments/assets/f2348a2b-966a-415a-b5e1-41bf51da822a) |
| **Downloads**                                                                                   | **Revenue**                                                                                 |
| ![Downloads](https://github.com/user-attachments/assets/22133429-dc8c-4ea6-8e7b-5f3952ac16b9)   | ![Revenue](https://github.com/user-attachments/assets/2e1bff2c-ff55-4d49-a87b-6fa4a6301076) |
| **Date filter**                                                                                 |                                                                                             |
| ![Date filter](https://github.com/user-attachments/assets/87a0632b-9a81-4763-ba7b-2470bce46d7a) |                                                                                             |

## How to Run the Project

1. Clone the repo: `https://github.com/kanatov/chart-data.git`
2. `cd chart-data`
3. Run `npm i` to install dependencies
4. Use `npm run` to list all available commands

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run build`    | Builds the production version of the project |
| `npm run preview`  | Runs build in production mode                |
| `npm run dev`      | Runs dev mode                                |
| `npm run lint`     | Lint errors check                            |
| ~~`npm run test`~~ | Tests were removed due to lack of time       |

## The next steps

I ran out of time but see a plenty of areas for improvements:

**Recover tests**
First of all I would like to restore the tests and wrap the elements to the context provider. In the current version running the test trigger a rabbit hole of errors so I had to cut them out.

**Optimised re-renders**
One of the exciting task to do is to decrease the ammount of re-renders to minimum so if I chage the date it will affect only the elements that needs to be re-rendered and nothing else.
  
**Input edge cases**
In addition to that filter has many edge cases that needs to be covered. Currently I make sure the start date of the range is less (and not equal) to the end date. The wrong range is not possible to set but the dates are still available to chose from the calendar and they are not reflecting the data boundries.

## Thank you!
