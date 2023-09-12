import React from 'react';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogAction from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false //팝업창 열려잇는지 닫혀잇는지
        }
    }

    //handleClickOpen = {   //바인딩 X
    handleClickOpen = () => {   //바인딩 O
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false //팝업창 열려잇는지 닫혀잇는지
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()  //데이터가 서버로 전잘됨에 있어서 오류가 발생하지 않도록 하나의 함수를 불러와 주고? 뭔소리야이게
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                //서버로 고객을 추가 한 후에(응답 받은 후)
                this.props.stateRefresh();  //props로 전달받은 steateRefresh 함수 실행
                this.state.open = false;    //모달창 닫기
            })
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
            //open: false
        }
        //window.location.reload();   //그냥 새로고침해서 다시조회해보자
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],    //하나의 파일만 선택해서 올리도록 하니깐 0번째(다중 업로드면  each)
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customersAdd';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('userName', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'   //전송할 데이터가 파일이 있을때 필수로 설정해줘야하는 옵션
            }
        }
        console.log(formData);
        return axios.post(url, formData, config);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogAction>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>취소</Button>
                    </DialogAction>
                </Dialog>
            </div>

        )
    }
}

export default withStyles(styles)(CustomerAdd);