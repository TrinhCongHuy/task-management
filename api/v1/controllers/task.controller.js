const Task = require("../models/task.model");
const paginationHelper = require('../../../helpers/pagination')
const searchHelper = require('../../../helpers/search')


// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

   // Search
   const objectSearch = searchHelper(req.query)

   if (objectSearch.regex) {
       find.title = objectSearch.regex
   }

  // Pagination
  const countTasks = await Task.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    },
    req.query,
    countTasks
  );

  // sort
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const taskDetail = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(taskDetail);
};

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status

    await Task.updateOne(
      {
        _id: id
      },
      {
        status: status
      }
    )

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  }catch(error) {
    res.json({
      code: 400,
      message: "Cập nhật trạng thái không thành công!"
    });
  }
  
};

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const {ids, key, value} = req.body

    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids }
          },
          {
            status: value
          }
        )
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        });
        break;
      
      default:
        res.json({
          code: 400,
          message: "Không tồn tại!"
        });
        break;
    }
    
  }catch(error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
  
};

// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()

    res.json({
      code: 200,
      message: "Thêm mới task thành công!"
    });
  }catch(error) {
    res.json({
      code: 400,
      message: "Lỗi!"
    });
  }
  
};

// [EDIT] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    await Task.updateOne(
      {
        _id: id
      },
      req.body
    )

    res.json({
      code: 200,
      message: "Chỉnh sửa task thành công!"
    });
  }catch(error) {
    res.json({
      code: 400,
      message: "Lỗi!"
    });
  }
  
};