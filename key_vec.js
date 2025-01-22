class Key_Vec{

    constructor() {
        this.keybord_arr = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m']];
        this.key_map = new Map();
          for(let i=0;i<3;i++)
          {
               for(let j=0;j< this.keybord_arr[i].length;j++)
              {
                this.key_map.set( this.keybord_arr[i][j], {"x":j,"y":2-i});
              }
          }
  
      }
  
  // Previous key = key1 , next key = key2
   Hand_Path(key1,key2){
      let key_distance = this.Key_Distance(key1,key2);
      let key_arc = this.Key_Arc(key1,key2);
      let key_same_hand = Is_Same_Hand(key1,key2);
      let result =  {"distance":key_distance, "arc":key_arc, "same_hand":key_same_hand};
      return result;
  }
  
    // Previous key = key1 , next key = key2

   Is_Near(key1,key2){
  let near_list = this.Near_Key_List(key1);
  for(let i;i<near_list.length;i++)
  {
      if(near_list[i]==key2){
          return true;
      }
  }
  return false;
  }
  
    // Previous key = key1 , next key = key2
  Is_Same_Hand(key1,key2){
    let vec1 = this.key_map.get(key1);
    let vec2 = this.key_map.get(key2);
    let center_pos1 = (this.keybord_arr[vec1.y].length-1)/2;
    let center_pos2 = (this.keybord_arr[vec2.y].length-1)/2;

    if(vec1.x>center_pos1&&vec2.x>center_pos2)
    {
        return true;
    }
    else if(vec1.x<=center_pos1&&vec2.x<=center_pos2){
        return true;
    }
    return false;

  }
   Key_Distance(key1,key2){
  let vec1 = this.key_map.get(key1);
  let vec2 = this.key_map.get(key2);
  
  let x_dis = Math.abs(vec1.x-vec2.x);
  let y_dis = Math.abs(vec1.y-vec2.y);
  let result = Math.sqrt(Math.pow(x_dis,2)+Math.pow(y_dis,2));
  
  return result;
  }

    // Previous key = key1 , next key = key2

   Key_Arc(key1,key2){
  let vec1 = this.key_map.get(key1);
  let vec2 = this.key_map.get(key2);
  
  let x = vec2.x-vec1.x;
  let y = vec2.y-vec1.y;
  console.log(x);
  console.log(y);
  let result = Math.atan2(y,x)* 180 / Math.PI;
  if (result<0)
  {
    result += 360;
  }
  return result;
  }
  
   Near_Key_List(key){
  let vec_x = this.key_map.get(key).x;
  let vec_y = this.key_map.get(key).y;
  let near_key_list  = new Array();
  let near_key;
  for(let i=1;i>=-1;i--)
  {
      if(vec_y+i<=this.keybord_arr.length)
      {
          for(let j=-1;j<=1;j++)
          {
              if(!(i==0&&j==0))
              {
                near_key =  this.keybord_arr[vec_y+i][vec_x+j];
                near_key_list.append(near_key);
              }
          }
      }
  }
  return near_key_list;
  }
  
  
  
  }
  
  
  
  
  // Example usage
  const key_vec_module = new Key_Vec();
  let test_path;
  test_path =  key_vec_module.Hand_Path("d","v");
  console.log(test_path);
  test_path =  key_vec_module.Hand_Path("d","x");
  console.log(test_path);
  test_path =  key_vec_module.Hand_Path("c","j");
  console.log(test_path);
  
  
  