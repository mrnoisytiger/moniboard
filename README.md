# moniboard
Moniboard - A custom dashboard for NetData with user-created views and graph choices.

## Things to-do
1. Create an add graph feature **(In Progress)**
    - [x] Should use a popup modal and prompt for relevant information **(Completed/Working)**
    - [x] Once all populated, send the relevant information to the backend and update the database **(Completed/Working)**
    - [ ] At the same time as previous step, load in the new graph on the fly. The DB should sync up eventually to be consistent **(Might remove/In Planning)**
        1. Don't forget to generate the graph ID and when it is received, update the DOM to have it
2. Create an edit section feature
    - [ ] Make the title, descriptions, and headings editable. 
    - [ ] When edit mode is deactivated, get the content of those editable fields and send to backend
    - [ ] Update the relevant section with those fields
        1. Updating the headings might be a bit hard
        2. Should store the headings objects with the relevant graph id as the key. Might make it a bit easier
3. Create an add view feature
    - [ ] Looks similar to the add graph feature
    - [ ] Should ask for basic view information, information to create a blank section
    - [ ] Send all to backend and create a brand new document
        1. Generate the relevant ID's
