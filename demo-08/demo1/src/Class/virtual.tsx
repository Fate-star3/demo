import React from 'react'

const count = 10000

function createMarkup(doms: any[]) {
  return doms.length ? { __html: doms.join(' ') } : { __html: '' }
}
type StateType = {
  simpleDOMs: any[];
};
type propType = {
  name: string;
  
};
interface Dom {
  state: StateType;
  props: propType
}

interface Test {
  simpleDOMs: any[]
}

export default class DOM extends React.Component<Dom> {
  constructor(props: Dom) {
    super(props)
    this.state: = {
      simpleDOMs: []
    }

    this.onCreateSimpleDOMs = this.onCreateSimpleDOMs.bind(this)
  }

  onCreateSimpleDOMs() {
    const array = []

    for (var i = 0; i < count; i++) {
      array.push('<div>' + i + '</div>')
    }

    this.setState({
      simpleDOMs: array
    })
  }

  render() {
    return (
      <div style={{ marginLeft: '10px' }}>
        <h3>Creat large of DOMs</h3>
        <button onClick={this.onCreateSimpleDOMs}>Create Simple DOMs</button>
        <div dangerouslySetInnerHTML={createMarkup(this.state.simpleDOMs)} />
      </div>
    )
  }
}
