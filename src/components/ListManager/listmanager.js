import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Badge, InputGroup, Form, Spinner } from 'react-bootstrap';
import { createList, removeList } from '../../actions/listsActions';
import { setProcessingForm } from '../../actions/appActions';
import { selectLists, selectSelectedList, selectList } from '../../selectors/lists';
import { FaTrashAlt } from 'react-icons/fa';

import './listmanager.css';

const mapStateToProps = (state) => {
    const isProcessing = (state.app.processing && state.app.processing.operateList) || false;
    const lists = selectLists(state);
    const selectedList = selectSelectedList(state);
    const list = selectList(state, selectedList);
    return {
        lists,
        selectedList,
        list,
        isProcessing,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createList: (name) => dispatch(createList(name)),
        removeList: (listId) => dispatch(removeList(listId)),
        setProcessingForm: (form, value) => dispatch(setProcessingForm(form, value)),
    };
};

class ListManager extends React.PureComponent {
    onCreateListInputChange(event) {
        this.setState({
            createListInput: event.target.value,
        })
    }
    async onCreate() {
        const { createList, setProcessingForm } = this.props;
        if (!this.state.createListInput) return;

        setProcessingForm('operateList', true);
        window.gtag('event', 'tracker', {'type': 'create-list'})
        await createList(this.state.createListInput);
        setProcessingForm('operateList', false);
    }
    async onDelete(list) {
        const { removeList, setProcessingForm } = this.props;
        if (!window.confirm("Are you sure you want to remove list " + list.listName)) return;
        setProcessingForm('operateList', true);
        window.gtag('event', 'tracker', {'type': 'delete-list'})
        await removeList(list.listId);
        setProcessingForm('operateList', false);
    }
    render() {
        const { onManagerToggle, showManager, lists, isProcessing } = this.props;
        return (
            <Modal show={showManager} onHide={onManagerToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage lists</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(lists).map((listKey) => {
                            return (
                                <p key={listKey} className="list-manager__item">
                                    {lists[listKey].listName}
                                    <Badge variant="info">{lists?.[listKey]?.items?.length-1}</Badge>
                                    {!isProcessing &&
                                        <FaTrashAlt className="list-manager__item-delete" onClick={this.onDelete.bind(this, lists[listKey])}/>
                                    }
                                    {isProcessing &&
                                        <Spinner className="list-manager__item-delete" animation="grow" size="sm" variant="warning"/>
                                    }
                                </p>
                            )
                        })
                    }
                    <InputGroup className="list-manager__new">
                        <Form.Control type="text" placeholder="My new project" onChange={this.onCreateListInputChange.bind(this)}/>
                        <InputGroup.Append>
                            <Button variant="primary" onClick={this.onCreate.bind(this)} disabled={isProcessing}>
                                {isProcessing &&
                                    <Spinner animation="grow" size="sm" variant="warning"/>
                                }
                                Create new list
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onManagerToggle}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ListManager = connect(mapStateToProps, mapDispatchToProps)(ListManager);
