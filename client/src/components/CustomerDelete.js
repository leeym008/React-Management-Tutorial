import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogAction from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typograpy from '@material-ui/core/Typography'


class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
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
                open: false //팝업창 열려잇는지 닫혀잇는지
            })
        }

    deleteCustomer(id) {
        
        const url = 'api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();

    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typograpy gutterBottom>
                            선택한 사용자 정보가 삭제됩니다.
                        </Typograpy>
                    </DialogContent>
                    <DialogAction>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogAction>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;