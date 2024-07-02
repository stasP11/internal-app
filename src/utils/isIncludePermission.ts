type PermissionType = "create" | "read" | "update" | "delete";

export default function isIncludePermission(
  pages: any,
  pageName: string,
  permission: PermissionType
) {

    if(pages && pageName && permission){
        return pages.some(
            (obj: any) =>
              obj?.page === pageName && obj?.access?.includes(permission)
          );
    }
}
