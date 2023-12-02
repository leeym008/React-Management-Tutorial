import React, { Component } from 'react';
import '../App.css';
import Customer from '../components/Customer'
import CustomerAdd from '../components/CustomerAdd'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

//스타일 클래스명 root, table 정의?
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

// React의 동작순서
// 1) constructor()
// 2) componentWillMount() 컴포넌트 전
// 3) render() -> 실제 컴포넌트 실행
// 4) componentDidMount() 컴포넌트 후
// 5) props or state => shoulComponentUpdate() 상태값 변경시 render()를 재실행

class NoticeBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      compolted: 0
    }
  }

  //고객 추가 후 목록만 새로고침
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  //Component 생명주기이 잇으며 Mount가 다 되었을때 실행되는 함수임
  componentDidMount() {
    this.timer = setInterval(this.progress, 100);
      this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
      const response = await fetch('/api/customers');
      const body = await response.json();
      return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 4});
  }

  render() {
    const { classes } = this.props; //이건 위에 스타일 정의한 값들을 따른다?
    return (
      <div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-2">
              <CustomerAdd stateRefresh={this.stateRefresh}>

              </CustomerAdd>
            </div>
          </div>
        </div>
        <Paper className={classes.NoticeBoard}>
          <Table className={classes.table}>
            <TableHead>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return ( 
                  <Customer
                    stateRefresh={this.stateRefresh}
                    key={c.id}  //key = PK라 생각하자
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })
              : 
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>

{/* 
         <ScatterChart/>
          */}
      </div>
    );
  }
}

export default withStyles(styles)(NoticeBoard);



