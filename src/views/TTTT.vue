<template>
  <div>





public List<GoodsCategoryVo> findGoodsCategory() {
        LambdaQueryWrapper<GoodsCategory> queryWrapper = new  LambdaQueryWrapper<>();
        queryWrapper.orderByAsc(GoodsCategory::getSortNum);
        // 查询所有数据
        List<GoodsCategory> list = list(queryWrapper);
        //将分类拷贝到Vo中使用hutool--BeanUtil.copyToList
        CopyOptions copyOptions = new CopyOptions();
        List<GoodsCategoryVo> voList = BeanUtil.copyToList(list, GoodsCategoryVo.class, copyOptions);
        // 找出pid为null的一级菜单,使用数据流stream()
        List<GoodsCategoryVo> voParentNodes = voList.stream().filter(goodsCategoryVo -> goodsCategoryVo.getPid() == null).collect(Collectors.toList());
        // 找出一级菜单的子菜单
        for (GoodsCategoryVo goodsCategoryVo : voParentNodes) {
            // 筛选所有数据中pid=父级id的数据就是二级菜单
            List<GoodsCategoryVo> voChildrenNodes = voList.stream().filter(m -> goodsCategoryVo.getId().equals(m.getPid())).collect(Collectors.toList());
            goodsCategoryVo.setChildren(voChildrenNodes);
        }
           return voParentNodes;
    }

















  </div>
</template>
