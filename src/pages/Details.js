import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getUserById } from '../lib/getUsers';
import editPolicy from '../lib/editPolicy';
import addPolicy from '../lib/addPolicy';

const initState={
  customer_name: '',
  customer_address: '',
  insurer_name: '',
  policy_type: '',
  premium: '',
  id: ''
}

const Details = () => {
  const { id } = useParams();
  const [defPolicies, setDefPolicies] = useState([]);
  const [premPolicies, setPremPolicies] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState(initState);
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
     getData();
  }, []);

  const getData = async () => {
    const {data} = await getUserById(id);
    const pol = data[0].policies;
    const defPol = pol.filter(p => p.policy_type === 'default');
    const premPol = pol.filter(p => p.policy_type === 'premium');
    setDefPolicies(defPol);
    setPremPolicies(premPol);
  }


  const openModal = (policy) => {
    setCurrentPolicy({
      customer_address: policy.customer_address,
      customer_name: policy.customer_name,
      insurer_name: policy.insurer_name,
      policy_type: policy.policy_type,
      premium: policy.premium,
      id: policy.id,
    });

    setIsOpen(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!currentPolicy.id) {
      await addPolicy(currentPolicy);
    } else {
      await editPolicy(currentPolicy);
    }
    setCurrentPolicy(initState);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentPolicy(initState);
  }

  const policyChangeHandler = (e) => {
    const {id, value} = e.target;
    setCurrentPolicy(prev => {
      return {
      ...prev,
      [id]: value
    }});
  } 

  return (
    <div className='pages-wrap'>
      {isOpen && (
        <div className="modal-wrap">
          <div className='modal-overlay' onClick={closeModal}></div>
          <div className="modal">
            <div className="modal-header">
              <h2>{currentPolicy.id ? 'Update Policy' : 'Add Policy'}</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form className='edit-form'>
                <div className='form-group'>
                  <label>Customer Name</label>
                  <input className='form-control'
                    onChange={policyChangeHandler}
                    type='text' id='customer_name'
                    value={currentPolicy?.customer_name}/>
                </div>
                <div className='form-group'>
                  <label>Address</label>
                  <input className='form-control'
                    onChange={policyChangeHandler}
                    type='text' id='customer_address' value={currentPolicy?.customer_address}/>
                </div>
                <div className='form-group'>
                  <label>POlicy Type</label>
                  <input className='form-control'
                    onChange={policyChangeHandler}
                    type='text' id='policy_type' value={currentPolicy.policy_type}/>
                </div>
                <div className='form-group'>
                  <label>Insurer Name</label>
                  <input className='form-control'
                    onChange={policyChangeHandler}
                    type='text' id='insurer_name' value={currentPolicy?.insurer_name}/>
                </div>
                <div className='form-group'>
                  <label>premium</label>
                  <input className='form-control'
                    onChange={policyChangeHandler}
                    type='text' id='premium' value={currentPolicy?.premium}/>
                </div>
                <button className="primary-btn" onClick={submitHandler}>
                Submit
              </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className='container'>
          <div className='title-head'>
              <h2>{state.name}</h2>
              <div className='search-wrap'>
                <button className='primary-btn' onClick={()=>{setIsOpen(true)}}>Add</button>
              </div>
          </div>
          <h3 className='subtitle'>Policies</h3>
        <div className='users-row'>
          <div className='detail-col'>
            {defPolicies.length>0 && 
              defPolicies.map(policy=> {
                return (
                  <div className='user-card' key={policy.id}>
                    <h3>{policy.customer_name}</h3>
                    <p>{policy.customer_address}</p>
                    <button onClick={()=> {openModal(policy)}} className='edit-btn'>Edit</button>
                  </div>
                )
              })
            }
          </div>

          <div className='detail-col'>
            {premPolicies.length>0 && 
              premPolicies.map(policy=> {
                return (
                  <div className='user-card' key={policy.id}>
                    <h3>{policy.customer_name}</h3>
                    <p>{policy.customer_address}</p>
                    <button onClick={()=> {openModal(policy)}} className='edit-btn'>Edit</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
