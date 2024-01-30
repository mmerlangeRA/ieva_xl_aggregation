I get event from server or UI
# Game Logic
## Game 
Server decides every state changes
Game receives events from UI and Server
A server state event contains
- type
- info on Game state
- action maybe (like player1 played ...)

Game only send actions to server

socketStore

We need to notify UI to display the action
And then Game decides what needs to be done next.
=> if trick not finished, then next_player has to play. 
    - notifies
        -> UI makes him active. Can play if me
        -> Server plays

Game is notified and play actions
    - notifies EventManager (player and game info)
        -> server and ui
        - UI takes into account

I need a reset (if I reload page)=> get full state from game ? even for me

GameAction=> isInternal: bool

Game subscribe to gameActions
and send gameActions and gameActionRequest ?

UI and ExternalActors subscribe to gameActions and send gameActions



Does Game needs to decide something ?

Other way 
I play in UI.
UI send PlayerPlayedCard
Game decides it needs that server gives player2 action
=> sends newActivePlayerEvent (StateEvent)
=> sends action and propagates origin
=> UI and server senders check origin and do if necessary
-> origin can be UI, Game or Server. you don't play your own actions

so 
=> ActionEvent
=> StateEvent
-> GameStarted, newRound, newActivePlayer