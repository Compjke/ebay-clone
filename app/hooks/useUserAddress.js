

const useUserAddress= async() => {
   let address = {};
   try {
      let res = await fetch("/api/address/get");

      if (res) {
        const data = await res.json();
        if (data) {
          address = data;
        }
      }
   

      return address;
   } catch (err) {
      console.log(err)
   }
}
export default useUserAddress;