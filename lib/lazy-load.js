var EventEmitter = require('events').EventEmitter;


module.exports = function(conf, React) {
  var emitter = new EventEmitter();
  emitter.setMaxListeners(0);

  var c = React.createClass({
    getDisplayName: function() {
      var component = this.state.c;
      if (!component) return 'ComponentLoader';
      var displayName = component.displayName || '';
      return displayName.toLowerCase() === displayName ?
        displayName + '-loader' :
        displayName + 'Loader';
    },
    componentWillMount: function() {
      var self = this;
      emitter.on('c', this.update);
    },
    componentDidMount: function() {
      var self = this;
      if (!self.state.c) setTimeout(function() {
        if (self.isMounted()) self.setState({le: true});
      }, 200);
    },
    getInitialState: function() {
      return {
        c: conf.g(),
        l: conf.l,
        le: false
      };
    },
    update: function(component) {
      this.setState({c: component});
    },
    componentWillUnmount: function() {
      emitter.removeListener('c', this.update);
    },
    render: function() {
      var component = this.state.c || (this.state.le ? this.state.l : null);
      if (!component) return false;
      return React.createElement(component, this.props, this.props.children);
    }
  });

  c.e = emitter;
  return c;
};
