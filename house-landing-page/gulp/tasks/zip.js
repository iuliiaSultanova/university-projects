import {deleteAsync} from "del";
import zipPLugin from "gulp-zip";

export const zip = () => {
  deleteAsync(`./${app.path.rootFolder}.zip`)
  return app.gulp.src(`${app.path.rootFolder}/**/*.*`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "ZIP",
      message: "Error, <%= error.message %>"
    }))
  )
  .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
  .pipe(app.gulp.dest('./'));
  }
