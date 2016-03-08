var mount = document.getElementById('js-example');

var Main = React.createClass({
  render: function () {
    return (
      <Container fluid={ true }>
        <Row>
          <Column extraSmall={ 12 }
                  small={ 1 }
                  medium={ 4 }
                  large={ 8 }
                  extraSmallPush={ 2 }>
            <p>
              Some text inside a column!
            </p>
          </Column>
          <Block extraSmall={ true } />
        </Row>
      </Container>
    )
  }
});

React.render(<Main />, mount);
