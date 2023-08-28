const TVEventHandler = require('TVEventHandler');

class Game2048 extends React.Component {
  _tvEventHandler: any;

  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp: { setState: (arg0: { board: any; }) => void; state: { board: { move: (arg0: number) => any; }; }; restartGame: () => void; }, evt: { eventType: string; }) {
      if (evt && evt.eventType === 'right') {
        cmp.setState({board: cmp.state.board.move(2)});
      } else if (evt && evt.eventType === 'up') {
        cmp.setState({board: cmp.state.board.move(1)});
      } else if (evt && evt.eventType === 'left') {
        cmp.setState({board: cmp.state.board.move(0)});
      } else if (evt && evt.eventType === 'down') {
        cmp.setState({board: cmp.state.board.move(3)});
      } else if (evt && evt.eventType === 'playPause') {
        cmp.restartGame();
      }
    });
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  componentDidMount() {
    this._enableTVEventHandler();
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
  }
}