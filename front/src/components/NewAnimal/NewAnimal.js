import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addNewAnimal } from '../../redux/actions'
// material-ui========================================
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom";

import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  message, 
  Modal
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: '/api/allAnimals',

  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 6
  }
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     //button
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//     // разметка
//     flexGrow: 1,
//   },
//   textar: {
//     // textarea
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
//   // селекты
//   formControl: {
//     margin: "20px",
//     minWidth: 300,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   // разметка
//   paper: {
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   margin: {
//     marginBottom: "25"
//   },
//   ch: {
//     margin: "8px",
//   },
//   input: {
//     display: 'none',
//   },
//   lab: {
//     color: 'black'
//   }
// }));
//======================================


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function NewAnimal() {

const [previewVisible, setPreviewVisible] = useState(false)
const [previewImage, setPreviewImage] = useState('')
const [previewTitle, setPreviewTitle] = useState('')
const [fileList, setFileList] = useState([])


const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

function handleCancel () {
  setPreviewVisible( false );
}


async function handlePreview(file) {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }

  setPreviewImage(file.url || file.preview)
  setPreviewVisible(true)
  setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
};

function handleChange({ fileList }) {
  setFileList({ fileList });
}















  const dispatch = useDispatch();
  const allAnimals = useSelector((state) => state.animals.animals)
  // const classes = useStyles();  //material-ui button
  const [error, setError] = useState(false);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    bigType: '',
    kindDog: '',
    kindCat: '',
    kindOther: '',
    nickname: '',
    description: '',
    age: '',
    pay: true,
    price: '',
    adultSize: '',
    adultweight: '',
    possibleForAllergySufferers: false,
    longHaired: false,
    guideВog: false,
    serviceAnimal: false,
    warDog: false,
    pet: false,
    onlyInNonApartments: false,
    specialConditionsOfDetention: false,
    childrenInTheHouse: false,
    exotic: false,
    farmAnimal: false,
    photo: null,
    gender: 'девочка',
    pedigree: '',
    vaccinationРistory: '',
  });

  function changed({ target: { value, name } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function fooCheckbox({ target: { name } }) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: !prevInputs[name],
    }));
  }
  function photoChanged({ target: { files, name } }) {
    setInputs({
      ...inputs,
      [name]: files[0],
    });;
  }

  async function onFinish(event) {
    // event.preventDefault();
    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key])
    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const response = await axios.post('/api/allAnimals', formData, config);
    const newAnimal = response.data
    for (let typeAnimals in allAnimals) {
      if (typeAnimals === newAnimal.type) {
        dispatch(addNewAnimal(newAnimal.type, newAnimal))
        return history.push(`/oneAnimal/${newAnimal._id}`);
      }
    }
    dispatch(addNewAnimal('other', newAnimal))
    return history.push(`/oneAnimal/${newAnimal._id}`);
  }

  function onFinish(newAnimal) {
    console.log("New", newAnimal.type);
    dispatch(addNewAnimal(newAnimal.type, newAnimal))
  };

  return (

    <Form
      encType="multipart/form-data"
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
    >
      <div className='title'>
        <h2>Подробная информация вашего животного:</h2>
      </div>
      <br />
      <Form.Item label="Вид животного:" name="type"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Выберите животное!"
          }
        ]}
      >
        <Select placeholder="Выберите животное">
          <Option value="cats">Кошка</Option>
          <Option value="dogs">Собака</Option>
          <Option value="other">Другое</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Порода:" name='kind'>
        <Input placeholder="Укажите породу" />
      </Form.Item>

      <Form.Item label="Кличка:" name='nickname'>
        <Input placeholder="Укажите кличку" />
      </Form.Item>

      <Form.Item label="Пол" name="gender"
        rules={[
          {
            required: true,
            message: "Выберите Пол!"
          }
        ]}
      >
        <Radio.Group>
          <Radio.Button value="male">Мальчик</Radio.Button>
          <Radio.Button value="female">Девочка</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Возраст:" name='age'>
        <Form.Item name="input-age" noStyle>
          <InputNumber min={0} max={99} />
        </Form.Item>
        <span className="ant-form-text"> годов</span>
      </Form.Item>

      <Form.Item label="Описание:" name='description'>
        <Input placeholder="Дополнительная информация" />
      </Form.Item>

      <Form.Item label="Форма оплаты" name="pay" >
        <Checkbox.Group>
          <Row>
            <Col span={24}>
              <Checkbox
                value="D"
                style={{
                  lineHeight: "32px"
                }}
              >
                Даром
                </Checkbox>
            </Col>

          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Цена:">
        <Form.Item name="price" noStyle>
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <span className="ant-form-text"> Руб</span>
      </Form.Item>

      <Form.Item label="Родословная:" name='pedigree'>
        <Input placeholder="Укажите родословную" />
      </Form.Item>

      <Form.Item label="Имеются ли прививки?"
        name="vaccin"
        hasFeedback
      >
        <Select placeholder="Наличие прививок:">
          <Option value="Yes">Да</Option>
          <Option value="No">Нет</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Вес взрослого животного:">
        <Form.Item name="adultWeight" noStyle>
          <InputNumber min={0} max={999} />
        </Form.Item>
        <span className="ant-form-text">кг</span>
      </Form.Item>

      <Form.Item label="Размер взрослого животного:"
        name="adultSize"
        hasFeedback
      >
        <Select placeholder="Выберите размер:">
          <Option value="Очень маленькое (хомяк и меньше)">Очень маленькое (хомяк и меньше)</Option>
          <Option value="Маленькое (кошка)">Маленькое (кошка)</Option>
          <Option value="Среднее (бульдог)">Среднее (бульдог)</Option>
          <Option value="Большое (сенбернар)">Большое (сенбернар)</Option>
          <Option value="Очень большое (лошадь и более)">Очень большое (лошадь и более)</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Вид животного" name="uniq" >
        <Checkbox.Group>
          <Row>
            <Col span={14}>
              <Checkbox
                value="Домашнее животное"
                style={{
                  lineHeight: "32px"
                }}
              >
                Домашнее животное
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Экзотическое животное"
                style={{
                  lineHeight: "32px"
                }}
              >
                Экзотическое животное
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Сельскохозяйственное животное"
                style={{
                  lineHeight: "32px"
                }}
              >
                Сельскохозяйственное животное
                </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="С какой целью" name="forWhat" >
        <Checkbox.Group>
          <Row>
            <Col span={14}>
              <Checkbox
                value="Cлужебное животное"
                style={{
                  lineHeight: "32px"
                }}
              >
                Cлужебное животное
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Служебная собака"
                style={{
                  lineHeight: "32px"
                }}
              >
                Служебная собака
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Собака-поводырь"
                style={{
                  lineHeight: "32px"
                }}
              >
                Собака-поводырь
                </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Среда обитания" name="environment" >
        <Checkbox.Group>
          <Row>
            <Col span={14}>
              <Checkbox
                value="Только вне квартиры"
                style={{
                  lineHeight: "32px"
                }}
              >
                Только вне квартиры
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Специальные условия содержания"
                style={{
                  lineHeight: "32px"
                }}
              >
                Специальные условия содержания
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Подходит для дома"
                style={{
                  lineHeight: "32px"
                }}
              >
                Подходит для дома
                </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Шерсть \ Аллергия" name="suffer" >
        <Checkbox.Group>
          <Row>
            <Col span={14}>
              <Checkbox
                value="Длинношерстное"
                style={{
                  lineHeight: "32px"
                }}
              >
                Длинношерстное
                </Checkbox>
            </Col>
            <Col span={14}>
              <Checkbox
                value="Не навредит аллергикам"
                style={{
                  lineHeight: "32px"
                }}
              >
                Не навредит аллергикам
                </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Switch name='children'
        checkedChildren="Есть дети"
        unCheckedChildren="Нет детей"
      />
      <br />
      <br />

      <>
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          name='photo'
          fileList={fileList}
          accept="image/*,image/jpeg"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>

      {/* <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
    </p>
      </Dragger> */}

      {/* <label htmlFor="photo">Загрузите фотографию животного: {' '}
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*,image/jpeg"
          onChange={photoChanged} />
        <img src={inputs.photo} alt="альтернативный текст" />
        <div>{inputs.photo}</div>
      </label>
      отправить форму
      <div
      >
        <Button
          type="submit"
          variant="contained"
          color="primary">
          Добавить Фото животного
      </Button>
      </div> */}

      {/* <div>
        <Form.Item>
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </div> */}

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6
        }}
      >
        <br />
        <Button type="primary" htmlType="submit">
          Submit
          </Button>
      </Form.Item>
    </Form>















    // <>
    //   <form onSubmit={addAnimal} encType="multipart/form-data">
    //     <div className={classes.root}>
    //       <Grid container spacing={5} >
    //         {/* Тип, порода, кличка */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center" >
    //           <div style={{ width: 300 }}>
    //             <Autocomplete
    //               inputProps={{ 'aria-label': 'Without label' }} name="bigType"
    //               inputValue={inputs.bigType}
    //               id="free-solo-demo"
    //               freeSolo
    //               options={typeAnimal.map((option) => option.type)}
    //               onInputChange={
    //                 (event, newInputValue) => {
    //                   changed({
    //                     target: { value: newInputValue, name: 'bigType' }
    //                   })
    //                 }}
    //               renderInput={(params) => (
    //                 <Select
    //                   {...params}
    //                   label="Тип животного"
    //                   margin="normal"
    //                   variant="outlined"
    //                   required
    //                 >
    //                   <MenuItem value="dogs">
    //                     Собака
    //                   </MenuItem>
    //                   <MenuItem value="cats">
    //                     Кошка
    //                   </MenuItem>
    //                   <MenuItem value="other">
    //                     Другое
    //                   </MenuItem>
    //                 </Select >
    //               )}
    //             />
    //           </div>
    //           {inputs.bigType === "dogs" ?
    //             <div style={{ width: 300 }}>
    //               <Autocomplete
    //                 name="kindDog"
    //                 inputValue={inputs.kindDog}
    //                 id="free-solo-demo"
    //                 freeSolo
    //                 options={kindDog.map((option) => option.type)}
    //                 onInputChange={(event, newInputValue) => {
    //                   changed({
    //                     target: { value: newInputValue, name: 'kindDog' }
    //                   })
    //                 }}
    //                 renderInput={(params) => (
    //                   <TextField
    //                     {...params}
    //                     label="Порода"
    //                     margin="normal"
    //                     variant="outlined"
    //                     required />
    //                 )}
    //               />
    //             </div>
    //             : inputs.bigType === "cats" ?
    //               <div style={{ width: 300 }}>
    //                 <Autocomplete
    //                   name="kindCat"
    //                   inputValue={inputs.kindCat}
    //                   id="free-solo-demo"
    //                   freeSolo
    //                   options={kindCat.map((option) => option.type)}
    //                   onInputChange={(event, newInputValue) => {
    //                     changed({
    //                       target: { value: newInputValue, name: 'kindCat' }
    //                     })
    //                   }}
    //                   renderInput={(params) => (
    //                     <TextField
    //                       {...params}
    //                       label="Порода"
    //                       margin="normal"
    //                       variant="outlined"
    //                       required
    //                     />
    //                   )}
    //                 />
    //               </div>
    //               : <TextField
    //                 id="standard-required"
    //                 name="kindOther"
    //                 label="Порода"
    //                 value={inputs.kindOther}
    //                 onChange={changed}
    //               />
    //           }
    //           <TextField
    //             id="standard-required"
    //             name="nickname"
    //             label="Кличка"
    //             required
    //             value={inputs.nickname}
    //             onChange={changed}
    //           />
    //         </Grid>
    //         {/* Гендер, возраст, Описание */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center"
    //           className={classes.formControl}>
    //           <FormControl component="fieldset">
    //             <FormLabel component="legend">
    //               Gender
    //             </FormLabel>
    //             <RadioGroup
    //               aria-label="gender"
    //               name="gender"
    //               value={inputs.gender}
    //               onChange={changed}
    //             >
    //               <FormControlLabel
    //                 value="female"
    //                 control={<Radio />}
    //                 label="Female"
    //               />
    //               <FormControlLabel
    //                 value="male"
    //                 control={<Radio />}
    //                 label="Male"
    //               />
    //             </RadioGroup>
    //           </FormControl>
    //           <TextField
    //             id="outlined-number"
    //             label="Возраст"
    //             type="number"
    //             variant="outlined"
    //             name="age"
    //             required
    //             value={inputs.age}
    //             onChange={changed}
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //           <TextField
    //             onChange={changed}
    //             name="description"
    //             id="outlined-multiline-static"
    //             label="Oписание"
    //             multiline
    //             rows={3}
    //             // cols={1}
    //             value={inputs.description}
    //             variant="outlined"
    //           />
    //         </Grid>
    //         {/* Даром, цена */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center"
    //           className={classes.formControl}
    //         >
    //           <label htmlFor="pay">Даром:
    //       <Checkbox

    //               name="pay"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.pay}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           {inputs.pay ?
    //             <TextField
    //               disabled
    //               id="filled-disabled"
    //               label="цена"
    //               defaultValue="-"
    //               variant="filled"
    //             />
    //             : <TextField
    //               id="outlined-number"
    //               label="Цена"
    //               type="number"
    //               variant="outlined"
    //               name="price"
    //               required
    //               value={inputs.price}
    //               onChange={changed}
    //               InputLabelProps={{
    //                 shrink: true,
    //               }}
    //             />}
    //         </Grid>
    //         {/* Родословная, история прививок */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-around"
    //           alignItems="center"
    //           className={classes.formControl}
    //         >
    //           <TextField
    //             onChange={changed}
    //             name="pedigree"
    //             id="outlined-helperText"
    //             label="Родословная"
    //             value={inputs.pedigree}
    //             helperText=""
    //             variant="outlined"
    //           />
    //           <TextField
    //             onChange={changed}
    //             name="vaccinationРistory"
    //             id="outlined-helperText"
    //             label="Имеются ли прививки?"
    //             value={inputs.vaccinationРistory}
    //             helperText=""
    //             variant="outlined" />
    //         </Grid>
    //         {/* Размер взрослого животного, вес взрослого животного */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-around"
    //           alignItems="center"
    //           className={classes.formControl}
    //         >
    //           <FormControl className={classes.formControl}>
    //             <InputLabel className={classes.sel} id="demo-simple-select-label">Размер взрослого животного</InputLabel>
    //             <Select

    //               name="adultSize"
    //               labelId="demo-simple-select-label"
    //               id="demo-simple-select"
    //               value={inputs.adultSize}
    //               onChange={changed}
    //             >
    //               <MenuItem value="Очень маленькое (ориентир: как хомяк и меньше)">
    //                 Очень маленькое (хомяк и меньше)
    //               </MenuItem>
    //               <MenuItem value="Маленькое (ориентир: как кошка)">
    //                 Маленькое (кошка)
    //               </MenuItem>
    //               <MenuItem value="Среднее (ориентир: как бульдог)">
    //                 Среднее (бульдог)
    //               </MenuItem>
    //               <MenuItem value="Большое (ориентир: как сенбернар)">
    //                 Большое (сенбернар)
    //               </MenuItem>
    //               <MenuItem value="Очень большое (ориентир: как лошадь и более)">
    //                 Очень большое (лошадь и более)
    //               </MenuItem>
    //             </Select>
    //           </FormControl>
    //           <TextField
    //             onChange={changed}
    //             name="adultweight"
    //             id="outlined-helperText"
    //             label="Вес взрослого животного"
    //             value={inputs.adultweight}
    //             helperText=""
    //             variant="outlined" />
    //         </Grid>
    //         {/* Домашнее, экзотическое, сельскохозяйственное */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center"
    //           className={classes.ch}>
    //           <label htmlFor="pet">Домашнее животное:
    //       <Checkbox

    //               name="pet"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.pet}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="exotic">Экзотическое животное:
    //       <Checkbox

    //               name="exotic"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.exotic}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="farmAnimal">Сельскохозяйственное животное:
    //       <Checkbox

    //               name="farmAnimal"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.farmAnimal}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //         </Grid>
    //         {/* Служебное животное, служебная собака, собака-поводырь */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-around"
    //           alignItems="center"
    //           className={classes.ch}>
    //           <label htmlFor="serviceAnimal">Cлужебное  животное:
    //       <Checkbox

    //               name="serviceAnimal"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.serviceAnimal}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="warDog">Служебная собака:
    //       <Checkbox

    //               name="warDog"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.warDog}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="guideВog">Собака-поводырь:
    //       <Checkbox

    //               name="guideВog"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.guideВog}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //         </Grid>
    //         {/* Длинношерстное, хороший вариант для аллергиков */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center"
    //           className={classes.ch}>
    //           <label htmlFor="longHaired">Длинношерстное:
    //       <Checkbox

    //               name="longHaired"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.longHaired}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="possibleForAllergySufferers">Хороший вариант для аллергиков:
    //       <Checkbox

    //               name="possibleForAllergySufferers"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.possibleForAllergySufferers}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //         </Grid>
    //         {/* Только в не квартиры, специальные условия содержания */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-evenly"
    //           alignItems="center"
    //           className={classes.ch}>
    //           <label htmlFor="onlyInNonApartments">Только в не квартиры:
    //       <Checkbox
    //               name="onlyInNonApartments"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.onlyInNonApartments}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //           <label htmlFor="specialConditionsOfDetention">Специальные условия содержания:
    //       <Checkbox
    //               name="specialConditionsOfDetention"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.specialConditionsOfDetention}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //         </Grid>
    //         {/* Дети в доме */}
    //         <Grid
    //           container
    //           direction="row"
    //           justify="space-around"
    //           alignItems="center"
    //           className={classes.ch}>
    //           <label htmlFor="childrenInTheHouse">Дети в доме:
    //       <Checkbox

    //               name="childrenInTheHouse"
    //               color="primary"
    //               inputProps={{ 'aria-label': 'secondary checkbox' }}
    //               checked={inputs.childrenInTheHouse}
    //               onChange={fooCheckbox}
    //             />
    //           </label>
    //         </Grid>
    //       </Grid>
    //     </div>
    //     {/* кнопка добавления животного */}

    //     <label htmlFor="photo">Загрузите фотографию животного: {' '}
    //       <input
    //         type="file"
    //         name="photo"
    //         id="photo"
    //         accept="image/*,image/jpeg"
    //         onChange={photoChanged} />
    //       {/* <img src={inputs.photo} alt="альтернативный текст" />
    //       <div>{inputs.photo}</div> */}
    //     </label>
    //     {/* отправить форму */}
    //     <div className={classes.root}>
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary">
    //         Добавить животное
    //       </Button>
    //     </div>

    //     {/* место для сообщения об ошибке */}
    //     {error && <div className="error">{error}</div>}
    //   </form>
    // </>

  )
}

const typeAnimal = [
  { type: 'dogs' },
  { type: 'cats' },
  { type: 'Впишите свой вариант' },
];
const kindDog = [
  { type: 'Впишите свой вариант' },
  { type: 'Немецкий шпиц' },
  { type: 'Йоркширский терьер' },
  { type: 'Чихуахуа' },
  { type: 'Немецкая овчарка' },
  { type: 'Лабрадор-ретривер' },
  { type: 'Хаски' },
  { type: 'Джек-рассел-терьерог' },
  { type: 'Среднеазиатская овчарка' },
  { type: 'Кавказская овчарка' },
  { type: 'Вельш-корги пемброк' },
  { type: 'Золотистый ретривер' },
  { type: 'Французский бульдог' },
  { type: 'Кокер-спаниель' },
  { type: 'Английский бульдог' },
  { type: 'Бигль' },
  { type: 'Пудель' },
  { type: 'Ротвейлер' },
  { type: 'Дог' },
  { type: 'Беспородная' },
];
const kindCat = [
  { type: 'Персидский кот' },
  { type: 'Британская короткошерстная.' },
  { type: 'Скоттиш-фолд' },
  { type: 'Сибирская' },
  { type: 'Мейн-кун' },
  { type: 'Сфинкс' },
  { type: 'Рекс' },
  { type: 'Персидская' },
  { type: 'Невская маскарадная' },
  { type: 'Русская голубая' },
  { type: 'Ориентальная' },
  { type: 'Сиамская' },
  { type: 'Шотландская вислоухая' },
  { type: 'Экзотическая кошка' },
  { type: 'Курильский бобтейл' },
  { type: 'Абиссинская' },
  { type: 'Австралийский мист' },
  { type: 'Азиатская (табби)' },
  { type: 'Акринская' },
  { type: 'Впишите свой вариант' },
];

export default NewAnimal;

{/* <div className={classes.root}>
          <input
            name="photo"
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">Загрузите фотографии:</Button>
          </label> */}

{/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" /> */ }
{/* <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label> */}
{/* </div> */ }
