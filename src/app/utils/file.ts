export function fileChangeListener(event: any, control: string = 'image') {
    if (event.target.files.length > 0) {
        this.userService.uploadFile(event.target.files[0]).subscribe((result: any) => {
            let data;
            data = { control: result.image.url };
            return data;
        }, err => {
            console.log(err);
        });
    }
}
