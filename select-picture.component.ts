import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DotToDotService } from 'src/app/Services/dot-to-dot.service';
import { DotToDot } from 'src/app/Classes/DotToDot';
import { PictureService } from 'src/app/Services/picture.service';
import { Picture } from 'src/app/Classes/Picture';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/Services/category.service';
import { PictureCategory } from 'src/app/Classes/PictureCategory';
import { PictureCategoryService } from 'src/app/Services/picture-category.service';

@Component({
  selector: 'app-select-picture',
  templateUrl: './select-picture.component.html',
  styleUrls: ['./select-picture.component.scss']
})
export class SelectPictureComponent implements OnInit {

  @Output() public onUplodeFinished = new EventEmitter();
  selectFile: File = null
  massege: string;
  progress: number;
  flag: boolean=false 
  isFlag11:boolean=false
  isFlag:boolean=false
  url?: string = "";
  flag1:boolean=true
  myFiles: Array<DotToDot> = new Array<DotToDot>();
  newurl: string
  myCategories:Array<Category>=new Array<Category>()
url1:string=""
  levelCode: number;

  constructor(private http: HttpClient, private dtd: DotToDotService,private picSer:PictureService,private cate:CategoryService,private picCatSer:PictureCategoryService) { 

    { 
             this.cate.get().subscribe(
        data=>{console.log(data);
          this.myCategories=data;

  }
      )
    }}
  ngOnInit(): void {
  }

newPic :Picture= new Picture()
newFile:DotToDot=new DotToDot();
listPic:Array<Picture>=new Array<Picture>();
newPicCat:PictureCategory=new PictureCategory();
listPicCat:Array<PictureCategory>=new Array<PictureCategory>();
categoryCode:number;
mypictureCategories:Array<Picture>= new Array<Picture>();


addPicture()

  {
    debugger;
    this.newPic.pictureName=this.selectFile.name;
  this.picSer.AddPic(this.newPic).subscribe(data=>{this.listPic=data,this.check1()},err=>console.log(err))

}
 

  getPicturesById(){
    console.log(this.categoryCode);
    

  
  }
  getPicId(){
    console.log(this.categoryCode);
    
    this.picCatSer.getByCategory(this.categoryCode).subscribe(
      data=>{console.log(data);
        this.mypictureCategories=data;
      },err=>{console.log("err...");
      }
    )
  }
  

  check1()
  { 
     }
  
    check2()
    {  
      debugger;
      try{
        
        alert("ברוך הבא"+" "+this.newPicCat.categoryId)
  
      }
      catch{  
         
     alert("בעיה בשמירת הנתונים")
  
        }
      }



  onSelect(event: any) {
   this.isFlag11=false
    this.flag1=true
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result.toString();


      }
    }
    this.selectFile = event.target.files[0];
    this.flag = true;
    this.flag1=false;
  }

  public try = () => {
    alert("succsses");
  }
  public uplodeFile = () => {
    this.addPicture();
    const formData = new FormData();
    formData.append('file', this.selectFile, this.selectFile.name);
    this.http.post("http://localhost:52180/api/uploade", formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        {
          this.addQuizFile();

          alert("ההעלאה הצליחה");

        }


        this.onUplodeFinished.emit(event.body.toString());
      }
    });
  }

    
 

addQuizFile(){
  debugger;
  if(this.selectFile!=null){
  this.dtd.create(this.selectFile.name).subscribe(
    data => {
      console.log(data);
this.flag=false
this.isFlag11=false;
      this.newurl = "http://localhost:52180/QuizFile/" + this.selectFile.name;
      this.isFlag = true;
    }, err => {
      debugger; console.log(err);
    }
  )
}

if(this.isFlag11==true)
{
  this.dtd.create(this.ste).subscribe(
    data => {
      console.log(data);
this.flag=false
this.isFlag11=false;
      this.newurl = "http://localhost:52180/QuizFile/" + this.ste;
      this.isFlag = true;
    }, err => {
      debugger; console.log(err);
    }
  )
}
}
refresh(): void {
  window.location.reload();
}

ste:string="";
  showImage(i:any)
  {
    this.isFlag11=true
    this.ste=i.pictureName;
    console.log(this.ste)
    this.url1="http://localhost:52180/Images/"+this.ste

    this.flag1=false
    console.log(this.url1)

  }
}
