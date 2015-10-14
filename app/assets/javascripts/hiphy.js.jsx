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
            // insert navbar here
            {this.props.children}
          </div>
      );
    }
  });

  var routes = (
      <Route path="/" component={App}>
        // add navbar here
        <IndexRoute component={Search} />
        <Route path="upload" component={UploadForm}/>
      </Route>
  );
  React.render(<Router>{routes}</Router>, root);
});
