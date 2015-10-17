$(function() {

  var root = document.getElementById('content');

  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
          <div>
            <header><h1>Hiphy</h1></header>
            <Search />
            {this.props.children}
          </div>
      );
    }
  });

  var routes = (
      <Route component={App}>
        <Route path="/" component={Index} />
        <Route path="/search/:query" component={Index} />
        <Route path="/gifs/:gifId" component={gifItem}/>
        <Route path="/upload" component={UploadForm}/>
      </Route>
  );
  if (root) {
    React.render(<Router>{routes}</Router>, root);
  }
});