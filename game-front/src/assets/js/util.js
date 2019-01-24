var getCurrentDay = {
	begin:new Date(new Date(new Date().toLocaleDateString()).getTime()),
	end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
}
export {getCurrentDay};