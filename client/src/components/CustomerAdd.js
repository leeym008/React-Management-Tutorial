import React from 'react';
import axios from "axios";

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()  //데이터가 서버로 전잘됨에 있어서 오류가 발생하지 않도록 하나의 함수를 불러와 주고? 뭔소리야이게
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                //서버로 고객을 추가 한 후에(응답 받은 후)
                this.props.stateRefresh();  //props로 전달받은 steateRefresh 함수 실행
            })
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
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
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="sumbit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;