import React from 'react'
import {connect} from 'react-redux'
import * as actions from './bugAction'


function But(props) {
  const { bugs } = props
  
  function getBugs() {
    props.getBugs()
  }

  function getBug(id) {
    props.getBugById(id)
  }

  function getTodos() {
    props.getTodos()
  }

  function bugAdd() {
    props.addBug({
      description: 'new bug',
      userId: 3
    })
  }

  function bugRemove(id) {
    props.bugRemoveById(id)
  }

  return (
    <div>
      Bug list
      <h1>Hello world</h1>
      <button onClick={bugAdd}>Add Bug</button>
      <button onClick={getBugs}>Get Bugs</button>
      <button onClick={getTodos}>Get Todos</button>
      {bugs?.map((b, i) => <div style={{ padding: 10, marginBottom: 10 }} key={i} >
        <b onClick={() => getBug(b.id)}>{b.description}</b>
        <button onClick={() => bugRemove(b.id)} >Delete</button>
        </div>)
      }
    </div>
  )
}

const mapStateToProps = ({ entities }) => ({
  loading: entities.api.isLoading,
  bugs: entities.bug.bugs,
})

const mapDispatchToProps = { ...actions }
export default connect(mapStateToProps, mapDispatchToProps)(But)
